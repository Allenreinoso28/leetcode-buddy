import "./globals.css";
import { Providers } from "@/components/Providers";
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { AuthGate } from "@/components/auth-gate";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-full overflow-hidden">
        <Providers>
          <AuthGate>
            <div className="[--header-height:calc(--spacing(14))]">
              <SidebarProvider className="flex flex-col">
                <SiteHeader />
                <div className="flex flex-1">
                  <AppSidebar />
                  <SidebarInset>
                    {children}
                  </SidebarInset>
                </div>
              </SidebarProvider>
            </div>
          </AuthGate>
        </Providers>
      </body>
    </html>
  );
}