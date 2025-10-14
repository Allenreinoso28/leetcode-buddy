"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  // SessionProvider uses React Context → must run in the browser
  return <SessionProvider>{children}</SessionProvider>;
}
