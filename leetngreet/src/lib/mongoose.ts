import mongoose from "mongoose";
import clientPromise from "./mongoClient";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  const client = await clientPromise;
  mongoose.connect(client.s.url, { dbName: "leetngreet" });
}
