"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if user is unauthenticated — but only after status resolves
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/Login");
    }
  }, [status, router]);

  // Optional loading UI (only shows on first mount)
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // If authenticated, just render children — no refetch, no flicker
  if (session) {
    return <>{children}</>;
  }

  // While redirecting, render nothing
  return null;
}
