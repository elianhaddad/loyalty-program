"use server"

import connectDB from "../db"
import RedemptionOption from "../models/redemption-option"
import { revalidatePath } from "next/cache"

export async function getRedemptionOptions() {
  await connectDB()
  const options = await RedemptionOption.find({}).sort({ points: 1 })
  return JSON.parse(JSON.stringify(options))
}

export async function getActiveRedemptionOptions() {
  await connectDB()
  const options = await RedemptionOption.find({ active: true }).sort({ points: 1 })
  return JSON.parse(JSON.stringify(options))
}

export async function createRedemptionOption(data: { points: number; details: string }) {
  await connectDB()

  const option = new RedemptionOption({
    points: data.points,
    details: data.details,
    active: true,
  })

  await option.save()
  revalidatePath("/configuration/redemption-options")
  return JSON.parse(JSON.stringify(option))
}

export async function updateRedemptionOption(id: string, data: { points: number; details: string; active: boolean }) {
  await connectDB()

  const option = await RedemptionOption.findByIdAndUpdate(
    id,
    {
      points: data.points,
      details: data.details,
      active: data.active,
    },
    { new: true },
  )

  if (!option) {
    throw new Error("Redemption option not found")
  }

  revalidatePath("/configuration/redemption-options")
  return JSON.parse(JSON.stringify(option))
}

export async function deleteRedemptionOption(id: string) {
  await connectDB()

  const option = await RedemptionOption.findByIdAndDelete(id)

  if (!option) {
    throw new Error("Redemption option not found")
  }

  revalidatePath("/configuration/redemption-options")
  return { success: true }
}
