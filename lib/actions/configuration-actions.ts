"use server"

import connectDB from "../db"
import Configuration from "../models/configuration"
import { revalidatePath } from "next/cache"

export async function getConfigurations() {
  await connectDB()
  const configurations = await Configuration.find({})
  return JSON.parse(JSON.stringify(configurations))
}

export async function getPointsRate(dayOfWeek: string) {
  await connectDB()

  // Normalize the day name
  const normalizedDay = dayOfWeek.toLowerCase()

  // Find the configuration for this day
  const config = await Configuration.findOne({ dayOfWeek: normalizedDay })

  // Return default rate if not found
  if (!config) {
    return 1
  }

  return config.conversionRate
}

export async function updateConfigurations(
  configurations: Array<{
    dayOfWeek: string
    conversionRate: number
    _id?: string
  }>,
) {
  await connectDB()

  const updates = configurations.map(async (config) => {
    return Configuration.findOneAndUpdate(
      { dayOfWeek: config.dayOfWeek },
      { conversionRate: config.conversionRate },
      { upsert: true, new: true },
    )
  })

  await Promise.all(updates)
  revalidatePath("/configuration")
}
