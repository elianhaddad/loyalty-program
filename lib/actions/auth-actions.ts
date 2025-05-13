"use server"

import connectDB from "../db"
import User from "../models/user"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export async function getUsers() {
  await connectDB()
  const users = await User.find({}).sort({ name: 1 })
  return JSON.parse(JSON.stringify(users))
}

export async function getUserById(id: string) {
  await connectDB()
  const user = await User.findById(id)
  if (!user) return null
  return JSON.parse(JSON.stringify(user))
}

export async function registerUser(userData: { name: string; email: string; password: string }) {
  await connectDB()

  // Check if user with this email already exists
  const existingUser = await User.findOne({ email: userData.email })
  if (existingUser) {
    throw new Error("A user with this email already exists")
  }

  // Create new user
  const user = new User({
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: "user", // Default role
  })

  await user.save()
  revalidatePath("/auth/login")

  return { success: true }
}

export async function createUser(userData: { name: string; email: string; password: string; role: "admin" | "user" }) {
  // Check if the current user is an admin
  const session = await auth()
  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized: Only admins can create users")
  }

  await connectDB()

  // Check if user with this email already exists
  const existingUser = await User.findOne({ email: userData.email })
  if (existingUser) {
    throw new Error("A user with this email already exists")
  }

  // Create new user
  const user = new User({
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role,
  })

  await user.save()
  revalidatePath("/admin/users")

  return { success: true }
}

export async function updateUser(
  id: string,
  userData: {
    name: string
    email: string
    role: "admin" | "user"
    password?: string
  },
) {
  // Check if the current user is an admin
  const session = await auth()
  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized: Only admins can update users")
  }

  await connectDB()

  // Check if another user with this email already exists
  const existingUser = await User.findOne({ email: userData.email, _id: { $ne: id } })
  if (existingUser) {
    throw new Error("Another user with this email already exists")
  }

  const updateData = {
    name: userData.name,
    email: userData.email,
    role: userData.role,
  }

  // Only update password if provided
  if (userData.password) {
    const user = await User.findById(id)
    if (!user) {
      throw new Error("User not found")
    }
    user.password = userData.password
    await user.save()
  }

  const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true })

  if (!updatedUser) {
    throw new Error("User not found")
  }

  revalidatePath("/admin/users")
  return { success: true }
}

export async function createAdminUser(userData: { name: string; email: string; password: string }) {
  await connectDB()

  // Check if user with this email already exists
  const existingUser = await User.findOne({ email: userData.email })
  if (existingUser) {
    throw new Error("A user with this email already exists")
  }

  // Create admin user
  const user = new User({
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: "admin",
  })

  await user.save()

  return { success: true }
}
