import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongoClient";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";

/**
 * This is the main NextAuth configuration object.
 * It defines where users are stored and which login providers to use.
 */
export const authOptions: NextAuthOptions = {
  // The adapter lets NextAuth store users, sessions, etc. in MongoDB.
  adapter: MongoDBAdapter(clientPromise),

  // The providers array defines how users can sign in.
  providers: [
    // 🔹 Google Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,       // From Google Cloud Console
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // 🔹 GitHub Login
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,              // From GitHub Developer Settings
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  // Use JWTs (JSON web tokens) for session handling instead of a database session
  session: { strategy: "jwt" },

  // Used to encrypt JWTs and session tokens (keep this secret!)
  secret: process.env.NEXTAUTH_SECRET,
};
