"use client";
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { AuthGate } from "@/components/auth-gate";


export default function UnAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
    <div className="h-(--header-height) w-full flex flex-col"> 
    <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset>
              <AuthGate>{children}</AuthGate>
            </SidebarInset>
        </div>
    </SidebarProvider>
    </div>
  );
}