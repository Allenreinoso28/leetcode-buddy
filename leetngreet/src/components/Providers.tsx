
// components/Providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";

export  function Providers({ children, session }: { children: React.ReactNode; session: any; }) {
  
  // SessionProvider uses React Context → must run in the browser
  return <SessionProvider session={session}>{children}</SessionProvider>;

}