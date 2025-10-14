import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

/**
 * This sets up the actual API endpoint for NextAuth.
 * - Handles GET requests (e.g., /api/auth/session)
 * - Handles POST requests (e.g., /api/auth/signin, /api/auth/signout)
 */
const handler = NextAuth(authOptions);

// Export both GET and POST so Next.js knows which HTTP methods are supported
export { handler as GET, handler as POST };
