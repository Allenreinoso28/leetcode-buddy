// app/login/layout.tsx
"use client";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { ThemeProvider } from "next-themes"

export default function LoginLayout({ children }: { children: React.ReactNode }) {

  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-full w-full flex items-center justify-center bg-background">
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
