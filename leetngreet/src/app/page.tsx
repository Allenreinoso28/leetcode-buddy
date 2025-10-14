"use client"; // This tells Next.js this component runs in the browser
import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { signIn, signOut, useSession } from "next-auth/react";

/**
 * The home page checks if a user is logged in using `useSession()`.
 * - If not logged in → show a Sign In button
 * - If logged in → show their name, image, and a Sign Out button
 */
export default function HomePage() {
  // useSession() gives access to the user's session info
  const { data: session } = useSession();

 

  // If the user IS logged in, show their name and picture
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Hello, {session.user?.name}</h1>
      <img
        src={session.user?.image ?? ""}
        alt="User Avatar"
        className="w-16 h-16 rounded-full mb-4"
      />
      <button
        onClick={() => signOut()} // Logs the user out
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Sign out
      </button>
    </main>
  );
}
