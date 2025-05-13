import mongoose, { Schema, type Document } from "mongoose"

export interface IRedemptionOption extends Document {
  points: number
  details: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

const RedemptionOptionSchema: Schema = new Schema(
  {
    points: { type: Number, required: true },
    details: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export default mongoose.models.RedemptionOption ||
  mongoose.model<IRedemptionOption>("RedemptionOption", RedemptionOptionSchema)
