require('dotenv').config();
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test2')
    const conn = await mongoose.connect(process.env.MONGO_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}