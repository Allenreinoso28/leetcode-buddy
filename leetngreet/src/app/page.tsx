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

  // If there’s no session, show the sign-in UI
  if (!session) {
    return (
       <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          
        </a>
        <LoginForm />
      </div>
    </div>);
    //   <main className="flex flex-col items-center justify-center h-screen">
        
    //     <h1 className="text-2xl mb-4">Welcome to LeetnGreet 👋</h1>
    //     <button
    //       onClick={() => signIn()} // Opens NextAuth’s built-in sign-in page
    //       className="bg-blue-500 text-white px-4 py-2 rounded"
    //     >
    //       Sign in with Google or GitHub
    //     </button>
    //   </main>
    // );
  }

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
