import mongoose, { Schema, type Document } from "mongoose"

export type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"

export interface IConfiguration extends Document {
  dayOfWeek: DayOfWeek
  conversionRate: number
  createdAt: Date
  updatedAt: Date
}

const ConfigurationSchema: Schema = new Schema(
  {
    dayOfWeek: {
      type: String,
      enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
      required: true,
      unique: true,
    },
    conversionRate: { type: Number, required: true, default: 1 },
  },
  { timestamps: true },
)

export default mongoose.models.Configuration || mongoose.model<IConfiguration>("Configuration", ConfigurationSchema)
