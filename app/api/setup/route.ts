import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import User from "@/lib/models/user"

export async function GET() {
  try {
    await connectDB()

    // Check if any users exist
    const userCount = await User.countDocuments()

    if (userCount > 0) {
      return NextResponse.json({
        success: false,
        message: "Setup has already been completed. Users already exist in the database.",
      })
    }

    // Create admin user
    const adminUser = new User({
      name: "Admin User",
      email: "admin@example.com",
      password: "Admin123!",
      role: "admin",
    })

    await adminUser.save()

    return NextResponse.json({
      success: true,
      message:
        "Admin user created successfully. You can now login with email: admin@example.com and password: Admin123!",
    })
  } catch (error) {
    console.error("Setup error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during setup" }, { status: 500 })
  }
}
