import mongoose, { Schema, type Document } from "mongoose"

export type MessageType = "one-time" | "recurring"
export type RecurrencePattern = "daily" | "weekly" | "monthly" | null

export interface IScheduledMessage extends Document {
  name: string
  message: string
  type: MessageType
  scheduledDate: Date | null
  recurrencePattern: RecurrencePattern
  recurrenceDays: string[] // ["monday", "tuesday", etc.]
  active: boolean
  lastRun: Date | null
  createdAt: Date
  updatedAt: Date
}

const ScheduledMessageSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["one-time", "recurring"], required: true },
    scheduledDate: { type: Date, default: null },
    recurrencePattern: { type: String, enum: ["daily", "weekly", "monthly", null], default: null },
    recurrenceDays: [{ type: String }],
    active: { type: Boolean, default: true },
    lastRun: { type: Date, default: null },
  },
  { timestamps: true },
)

export default mongoose.models.ScheduledMessage ||
  mongoose.model<IScheduledMessage>("ScheduledMessage", ScheduledMessageSchema)
