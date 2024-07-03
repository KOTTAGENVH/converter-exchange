import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.database;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

const db = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URI as string);
    console.log("MongoDB connected");
    return connection;
  } catch (error) {
    console.error("Database Error " + error);
    throw error;
  }
};

export default db;