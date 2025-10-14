"use client";

import { useSession } from "next-auth/react";
import { LoginForm } from "@/components/login-form";
import { GalleryVerticalEnd } from "lucide-react";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  // Optional loading state
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // If no session, show the overlay login screen
  if (!session) {
    return (
      <div className="relative min-h-screen w-full">
        {/* Blurred background */}
        <div className="absolute inset-0 backdrop-blur-md bg-black/40 z-10" />

        {/* Centered login form */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="bg-muted flex min-h-[60vh] flex-col items-center justify-center gap-6 p-6 md:p-10 rounded-xl shadow-lg">
            <div className="flex w-full max-w-sm flex-col gap-6">
              <a
                href="#"
                className="flex items-center gap-2 self-center font-medium"
              >
                <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                LeetNGreet
              </a>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If logged in, show the app normally
  return <>{children}</>;
}
