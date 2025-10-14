"use client";
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { AuthGate } from "@/components/auth-gate";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGate>
        {children}     
    </AuthGate>

  );
}