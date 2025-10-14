// app/login/layout.tsx
"use client";
import "./globals.css";
import { Providers } from "@/components/Providers";

export default function LoginLayout({ children }: { children: React.ReactNode }) {

  
  return (
    <html lang="en">
      <body className="h-full w-full flex items-center justify-center bg-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
