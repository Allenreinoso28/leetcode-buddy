"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PanelLeft } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { NavUser } from "@/components/nav-user";
import { SearchForm } from "@/components/search-form";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const { data: session } = useSession();
  const { theme, resolvedTheme } = useTheme();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const logoSrc = currentTheme === "dark" ? "/logoLight.svg" : "/logoDark.svg";

  const data = {
    user: {
      name: session?.user?.name || "Guest",
      email: session?.user?.email || "",
      avatar: session?.user?.image || "/avatars/placeholder.png",
    },
  };

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center justify-between pl-1 pr-4">
        {/* Left Section: Sidebar + Logo */}
        <div className="flex items-center gap-2">
          <Button className="p-6" variant="ghost" size="icon" onClick={toggleSidebar}>
            <PanelLeft className="size-8" />
          </Button>
          <Separator orientation="vertical" className="mr-2" />

          <Button className="p-0 width-auto h-auto" variant="ghost" onClick={() => router.push("/")}>
            {mounted && (
              <Image
                src={logoSrc}
                alt="LeetNGreet Logo"
                width={50}
                height={50}
                priority
              />
            )}
          </Button>
        </div>

        {/* Right Section: Search + User */}
        <div className="flex w-fit items-center">
          <SearchForm className="w-xs pr-4" />
          <Separator orientation="vertical" className="mr-2" />
          <NavUser user={data.user} />
        </div>
      </div>
    </header>
  );
}
