import mongoose, { Schema, type Document } from "mongoose"

export type TransactionType = "purchase" | "redemption"

export interface ITransaction extends Document {
  clientId: mongoose.Types.ObjectId
  type: TransactionType
  amount: number
  points: number
  date: Date
  details?: string
  createdAt: Date
  updatedAt: Date
}

const TransactionSchema: Schema = new Schema(
  {
    clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    type: { type: String, enum: ["purchase", "redemption"], required: true },
    amount: { type: Number, required: true },
    points: { type: Number, required: true },
    date: { type: Date, required: true },
    details: { type: String },
  },
  { timestamps: true },
)

export default mongoose.models.Transaction || mongoose.model<ITransaction>("Transaction", TransactionSchema)
