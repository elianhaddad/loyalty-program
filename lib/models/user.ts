import mongoose, { Schema, type Document } from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser extends Document {
  email: string
  password: string
  name: string
  role: "admin" | "user"
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true },
)

// Hash password before saving
UserSchema.pre("save", async function (next) {
  const user = this as IUser

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next()

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10)

    // Hash the password along with the new salt
    const hashedPassword = await bcrypt.hash(user.password, salt)

    // Replace the plaintext password with the hashed one
    user.password = hashedPassword
    next()
  } catch (error) {
    next(error as Error)
  }
})

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
