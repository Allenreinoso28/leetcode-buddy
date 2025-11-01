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

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },

  // Optional: fine-tune JWT behavior
  jwt: {
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },

  callbacks: {
    async jwt({ token, user }) {
      // When user logs in for the first time
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the user's ID to the session object
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  // Optional: pretty URLs for sign-in/sign-out pages
  pages: {
    signIn: "/login",
  },

  // Optional: debug mode (disable in production)
  debug: process.env.NODE_ENV === "development",
};
