"use client"

import { SidebarIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { SearchForm } from "@/components/search-form"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { NavUser } from "@/components/nav-user"
import Image from "next/image"
import Link from "next/link"

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()
  const { data: session } = useSession();

  const data = {
    user: {
      name: session?.user?.name || "Guest",
      email: session?.user?.email || "",
      avatar: session?.user?.image || "/avatars/placeholder.png",
    },
  }

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center justify-between px-4">
        {/* Left Section: Sidebar + Logo */}
        <div className="flex items-center gap-2">
          <Button
            className="h-8 w-8"
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <SidebarIcon className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={28}
              height={28}
              className="rounded-sm"
            />
            <span className="font-semibold text-lg hidden sm:inline">Home</span>
          </Link>
        </div>

        {/* Right Section: Search + User */}
        <div className="flex w-md items-center pr-12">
          <SearchForm className="w-sm" />
          <Separator orientation="vertical" className="ml-2 h-5" />
          <NavUser user={data.user} />
        </div>
      </div>
    </header>
  )
}
