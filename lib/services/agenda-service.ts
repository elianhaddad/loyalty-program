import Agenda from "agenda"
import connectDB from "../db"
import Client from "../models/client"
import ScheduledMessage from "../models/scheduled-message"
import { sendBroadcastMessage } from "./whatsapp-service"

let agenda: Agenda | null = null

export async function getAgenda() {
  if (agenda) return agenda

  await connectDB()

  // Inicializar Agenda con la misma conexión de MongoDB
  agenda = new Agenda({
    db: { address: process.env.MONGODB_URI || "mongodb://localhost:27017/points-system", collection: "agendaJobs" },
  })

  // Definir el trabajo para enviar mensajes
  agenda.define("send scheduled message", async (job) => {
    const { messageId } = job.attrs.data

    try {
      const message = await ScheduledMessage.findById(messageId)
      if (!message || !message.active) return

      // Obtener todos los clientes suscritos
      const clients = await Client.find({ whatsappSubscribed: true })

      // Enviar el mensaje a todos los clientes
      await sendBroadcastMessage(clients, message.message)

      // Actualizar la fecha de última ejecución
      message.lastRun = new Date()
      await message.save()

      console.log(`Sent scheduled message "${message.name}" to ${clients.length} clients`)
    } catch (error) {
      console.error("Error sending scheduled message:", error)
    }
  })

  await agenda.start()

  return agenda
}

export async function scheduleMessage(messageId: string, date: Date) {
  const agenda = await getAgenda()

  // Cancelar trabajos existentes para este mensaje
  await agenda.cancel({ "data.messageId": messageId })

  // Programar el nuevo trabajo
  await agenda.schedule(date, "send scheduled message", { messageId })

  return { success: true, message: "Message scheduled successfully" }
}

export async function scheduleRecurringMessage(messageId: string, pattern: string, days: string[]) {
  const agenda = await getAgenda()

  // Cancelar trabajos existentes para este mensaje
  await agenda.cancel({ "data.messageId": messageId })

  let cronExpression = ""

  // Crear expresión cron basada en el patrón y días
  if (pattern === "daily") {
    cronExpression = "0 10 * * *" // Todos los días a las 10:00 AM
  } else if (pattern === "weekly") {
    // Convertir días de la semana a números para cron (0=domingo, 1=lunes, etc.)
    const dayMap: Record<string, number> = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    }

    const dayNumbers = days.map((day) => dayMap[day]).sort()
    cronExpression = `0 10 * * ${dayNumbers.join(",")}` // A las 10:00 AM en los días seleccionados
  } else if (pattern === "monthly") {
    cronExpression = "0 10 1 * *" // El primer día de cada mes a las 10:00 AM
  }

  if (cronExpression) {
    await agenda.every(cronExpression, "send scheduled message", { messageId })
  }

  return { success: true, message: "Recurring message scheduled successfully" }
}

export async function cancelScheduledMessage(messageId: string) {
  const agenda = await getAgenda()

  await agenda.cancel({ "data.messageId": messageId })

  return { success: true, message: "Scheduled message cancelled" }
}
