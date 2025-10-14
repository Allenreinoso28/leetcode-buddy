"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

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
      redirect('/Login')
    );
  }

  // If logged in, show the app normally
  return <>{children}</>;
}
