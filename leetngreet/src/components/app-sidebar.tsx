"use client"
import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Braces,
  Settings2,
  SquareTerminal,
  SquareKanban,
  User,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {

  navMain: [
    {
      title: "/ Hello_World",
      url: "/Hello",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "/ Posts",
      url: "/Posts",
      icon: SquareKanban,
      items: [
        {
          title: "/ All_Posts",
          url: "/Posts",
        },
        {
          title: "/ Following",
          url: "/Posts/Following",
        },
      ],
    },
    {
      title: "/ Compose",
      url: "/Compose",
      icon: Braces,
      isActive: true,
    },
    {
      title: "/ User_Profile",
      url: "/Profile",
      icon: User,
      isActive: true,
    },
    {
      title: "Settings",
      url: "#",
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
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="h-(--header-height) p-2"></div>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}