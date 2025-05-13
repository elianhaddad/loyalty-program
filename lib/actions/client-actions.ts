"use server"

import connectDB from "@/lib/db-server" // Usar la versión de servidor
import Client from "@/lib/models/client"
import { revalidatePath } from "next/cache"

export async function getClients() {
  await connectDB()
  const clients = await Client.find({}).sort({ fullName: 1 })
  return JSON.parse(JSON.stringify(clients))
}

export async function getClientById(id: string) {
  await connectDB()
  const client = await Client.findById(id)
  if (!client) return null
  return JSON.parse(JSON.stringify(client))
}

export async function getSubscribedClients() {
  await connectDB()
  const clients = await Client.find({ whatsappSubscribed: true }).sort({ fullName: 1 })
  return JSON.parse(JSON.stringify(clients))
}

export async function createClient(clientData: {
  dni: string
  phone: string
  fullName: string
  whatsappSubscribed: boolean
}) {
  await connectDB()

  // Check if client with this DNI already exists
  const existingClient = await Client.findOne({ dni: clientData.dni })
  if (existingClient) {
    throw new Error("A client with this DNI already exists")
  }

  const client = new Client({
    dni: clientData.dni,
    phone: clientData.phone,
    fullName: clientData.fullName,
    totalPoints: 0,
    whatsappSubscribed: clientData.whatsappSubscribed,
  })

  await client.save()
  revalidatePath("/clients")
  return JSON.parse(JSON.stringify(client))
}

export async function updateClient(
  id: string,
  clientData: { dni: string; phone: string; fullName: string; whatsappSubscribed: boolean },
) {
  await connectDB()

  // Check if another client with this DNI already exists
  const existingClient = await Client.findOne({ dni: clientData.dni, _id: { $ne: id } })
  if (existingClient) {
    throw new Error("Another client with this DNI already exists")
  }

  const client = await Client.findByIdAndUpdate(
    id,
    {
      dni: clientData.dni,
      phone: clientData.phone,
      fullName: clientData.fullName,
      whatsappSubscribed: clientData.whatsappSubscribed,
    },
    { new: true },
  )

  if (!client) {
    throw new Error("Client not found")
  }

  revalidatePath("/clients")
  revalidatePath(`/clients/${id}`)
  return JSON.parse(JSON.stringify(client))
}

export async function toggleWhatsAppSubscription(id: string, subscribed: boolean) {
  await connectDB()

  const client = await Client.findByIdAndUpdate(id, { whatsappSubscribed: subscribed }, { new: true })

  if (!client) {
    throw new Error("Client not found")
  }

  revalidatePath("/clients")
  revalidatePath(`/clients/${id}`)
  return JSON.parse(JSON.stringify(client))
}
