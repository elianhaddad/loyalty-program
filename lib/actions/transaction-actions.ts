"use server"

import connectDB from "../db"
import Transaction from "../models/transaction"
import Client from "../models/client"
import { revalidatePath } from "next/cache"
import mongoose from "mongoose"
// import { sendPurchaseNotification } from "../services/whatsapp-service"
import { getActiveRedemptionOptions } from "./redemption-options-actions"

export async function getClientTransactions(clientId: string) {
  await connectDB()
  const transactions = await Transaction.find({
    clientId: new mongoose.Types.ObjectId(clientId),
  }).sort({ date: -1 })

  return JSON.parse(JSON.stringify(transactions))
}

export async function createPurchase(data: {
  clientId: string
  amount: number
  date: Date
  points: number
  details?: string
}) {
  await connectDB()

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    // Create the transaction
    const transaction = new Transaction({
      clientId: new mongoose.Types.ObjectId(data.clientId),
      type: "purchase",
      amount: data.amount,
      points: data.points,
      date: data.date,
      details: data.details,
    })

    await transaction.save({ session })

    // Update client's total points
    const client = await Client.findById(data.clientId)
    if (!client) {
      throw new Error("Client not found")
    }

    client.totalPoints += data.points
    await client.save({ session })

    await session.commitTransaction()

    revalidatePath("/clients")
    revalidatePath(`/clients/${data.clientId}`)

    // Send WhatsApp notification if client is subscribed
    if (client.whatsappSubscribed) {
      const availableRedemptions = await getActiveRedemptionOptions()
      // await sendPurchaseNotification(client, data.points, availableRedemptions)
    }

    return JSON.parse(JSON.stringify(transaction))
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

export async function createRedemption(data: {
  clientId: string
  points: number
  date: Date
  details: string
}) {
  await connectDB()

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    // Check if client has enough points
    const client = await Client.findById(data.clientId)
    if (!client) {
      throw new Error("Client not found")
    }

    if (client.totalPoints < data.points) {
      throw new Error(`Client only has ${client.totalPoints} points available`)
    }

    // Create the transaction
    const transaction = new Transaction({
      clientId: new mongoose.Types.ObjectId(data.clientId),
      type: "redemption",
      amount: 0, // No monetary amount for redemptions
      points: data.points,
      date: data.date,
      details: data.details,
    })

    await transaction.save({ session })

    // Update client's total points
    client.totalPoints -= data.points
    await client.save({ session })

    await session.commitTransaction()

    revalidatePath("/clients")
    revalidatePath(`/clients/${data.clientId}`)

    return JSON.parse(JSON.stringify(transaction))
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}
