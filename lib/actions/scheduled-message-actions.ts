"use server"

import connectDB from "../db"
import ScheduledMessage from "../models/scheduled-message"
import { revalidatePath } from "next/cache"
import { scheduleMessage, scheduleRecurringMessage, cancelScheduledMessage } from "../services/agenda-service"
import type { MessageType, RecurrencePattern } from "../models/scheduled-message"

export async function getScheduledMessages() {
  await connectDB()
  const messages = await ScheduledMessage.find({}).sort({ createdAt: -1 })
  return JSON.parse(JSON.stringify(messages))
}

export async function getScheduledMessageById(id: string) {
  await connectDB()
  const message = await ScheduledMessage.findById(id)
  if (!message) return null
  return JSON.parse(JSON.stringify(message))
}

export async function createScheduledMessage(data: {
  name: string
  message: string
  type: MessageType
  scheduledDate?: Date
  recurrencePattern?: RecurrencePattern
  recurrenceDays?: string[]
}) {
  await connectDB()

  const scheduledMessage = new ScheduledMessage({
    name: data.name,
    message: data.message,
    type: data.type,
    scheduledDate: data.type === "one-time" ? data.scheduledDate : null,
    recurrencePattern: data.type === "recurring" ? data.recurrencePattern : null,
    recurrenceDays: data.type === "recurring" && data.recurrencePattern === "weekly" ? data.recurrenceDays : [],
    active: true,
  })

  await scheduledMessage.save()

  // Programar el mensaje con Agenda
  if (data.type === "one-time" && data.scheduledDate) {
    await scheduleMessage(scheduledMessage._id.toString(), data.scheduledDate)
  } else if (data.type === "recurring" && data.recurrencePattern) {
    await scheduleRecurringMessage(
      scheduledMessage._id.toString(),
      data.recurrencePattern,
      data.recurrencePattern === "weekly" ? data.recurrenceDays || [] : [],
    )
  }

  revalidatePath("/configuration/scheduled-messages")
  return JSON.parse(JSON.stringify(scheduledMessage))
}

export async function updateScheduledMessage(
  id: string,
  data: {
    name: string
    message: string
    type: MessageType
    scheduledDate?: Date
    recurrencePattern?: RecurrencePattern
    recurrenceDays?: string[]
    active: boolean
  },
) {
  await connectDB()

  const message = await ScheduledMessage.findById(id)
  if (!message) {
    throw new Error("Scheduled message not found")
  }

  // Actualizar los campos
  message.name = data.name
  message.message = data.message
  message.type = data.type
  message.scheduledDate = data.type === "one-time" ? data.scheduledDate || null : null
  message.recurrencePattern = data.type === "recurring" ? data.recurrencePattern || null : null
  message.recurrenceDays =
    data.type === "recurring" && data.recurrencePattern === "weekly" ? data.recurrenceDays || [] : []
  message.active = data.active

  await message.save()

  // Cancelar el trabajo existente
  await cancelScheduledMessage(id)

  // Reprogramar si está activo
  if (data.active) {
    if (data.type === "one-time" && data.scheduledDate) {
      await scheduleMessage(id, data.scheduledDate)
    } else if (data.type === "recurring" && data.recurrencePattern) {
      await scheduleRecurringMessage(
        id,
        data.recurrencePattern,
        data.recurrencePattern === "weekly" ? data.recurrenceDays || [] : [],
      )
    }
  }

  revalidatePath("/configuration/scheduled-messages")
  return JSON.parse(JSON.stringify(message))
}

export async function deleteScheduledMessage(id: string) {
  await connectDB()

  // Cancelar el trabajo programado
  await cancelScheduledMessage(id)

  // Eliminar el mensaje
  const message = await ScheduledMessage.findByIdAndDelete(id)
  if (!message) {
    throw new Error("Scheduled message not found")
  }

  revalidatePath("/configuration/scheduled-messages")
  return { success: true }
}

export async function toggleScheduledMessageActive(id: string, active: boolean) {
  await connectDB()

  const message = await ScheduledMessage.findById(id)
  if (!message) {
    throw new Error("Scheduled message not found")
  }

  message.active = active
  await message.save()

  // Si se desactiva, cancelar el trabajo
  if (!active) {
    await cancelScheduledMessage(id)
  }
  // Si se activa, reprogramar
  else {
    if (message.type === "one-time" && message.scheduledDate) {
      await scheduleMessage(id, message.scheduledDate)
    } else if (message.type === "recurring" && message.recurrencePattern) {
      await scheduleRecurringMessage(
        id,
        message.recurrencePattern,
        message.recurrencePattern === "weekly" ? message.recurrenceDays : [],
      )
    }
  }

  revalidatePath("/configuration/scheduled-messages")
  return JSON.parse(JSON.stringify(message))
}
