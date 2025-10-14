import { MongoClient } from "mongodb";

// Your MongoDB connection string (comes from .env.local)
const uri = process.env.MONGODB_URI!;

// Optional settings object (you can leave it empty for now)
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

// Safety check to make sure the environment variable exists
if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

/**
 * In development, Next.js can re-import files on every save,
 * which would cause multiple connections to MongoDB.
 * To prevent that, we store the connection in a global variable
 * so it can be reused across reloads.
 */
if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    // Connect once and store it globally
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production, just connect normally
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
  clientPromise.then(() => console.log("✅ Connected to MongoDB"));
}

// Export the connected client so other files can use it
export default clientPromise;

