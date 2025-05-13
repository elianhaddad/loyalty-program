import mongoose, { Schema, type Document } from "mongoose"

export interface IClient extends Document {
  dni: string
  phone: string
  fullName: string
  totalPoints: number
  whatsappSubscribed: boolean
  createdAt: Date
  updatedAt: Date
}

const ClientSchema: Schema = new Schema(
  {
    dni: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    fullName: { type: String, required: true },
    totalPoints: { type: Number, default: 0 },
    whatsappSubscribed: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export default mongoose.models.Client || mongoose.model<IClient>("Client", ClientSchema)
