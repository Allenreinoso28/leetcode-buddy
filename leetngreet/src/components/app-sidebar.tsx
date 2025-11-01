"use client"
import * as React from "react"
import {
  Braces,
  Settings2,
  SquareTerminal,
  SquareKanban,
  User,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const data = {

  navMain: [
    {
      title: "/ Hello_World",
      url: "/Hello",
      icon: SquareTerminal,
      isActive: pathname === "/Hello",
    },
    {
      title: "/ Posts",
      url: "/Posts",
      icon: SquareKanban,
      items: [
        {
          title: "/ All_Posts",
          url: "/Posts",
          isActive: pathname === "/Posts",
        },
        {
          title: "/ Following",
          url: "/Posts/Following",
          isActive: pathname === "/Posts/Following",
        },
      ],
      isActive: pathname === "/Posts" || pathname === "/Posts/Following",
    },
    {
      title: "/ Compose",
      url: "/Compose",
      icon: Braces,
      isActive: pathname === "/Compose",
    },
    {
      title: "/ User_Profile",
      url: "/Profile",
      icon: User,
      isActive: pathname === "/Profile",
    },
    {
      title: "/ Settings",
      url: "/Settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  
}
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}