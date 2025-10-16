// app/login/layout.tsx

import "./globals.css";
import {Providers} from "@/components/Providers";
import { ThemeProvider } from "next-themes"
import { getServerSession } from "next-auth";

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-full w-full flex items-center justify-center bg-background">
        <Providers session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
