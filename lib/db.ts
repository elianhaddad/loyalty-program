import mongoose from "mongoose"

// Asegúrate de que este archivo solo se ejecute en el servidor
export const runtime = "nodejs"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/points-system"

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default connectDB
