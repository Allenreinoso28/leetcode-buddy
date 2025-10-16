"use client"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { ChevronRight, type LucideIcon } from "lucide-react"
import Image from "next/image"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useRouter, usePathname } from "next/navigation"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname()
  const router = useRouter()

  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const currentTheme = theme === "system" ? resolvedTheme : theme
  const logoSrc = currentTheme === "dark" ? "/logoLight.svg" : "/logoDark.svg"

  const handleSideBarClick = (targetPath: string) => {
    if (pathname !== targetPath) {
      router.push(targetPath)
    }
  }

  return (
    <SidebarGroup>
      <div className="flex h-(--header-height) items-center gap-4 text-xl">
        {mounted && (
          <Image src={logoSrc} alt="LeetNGreet Logo" width={50} height={50} />
        )}
        LeetNGreet
      </div>

      <SidebarMenu className="space-y-0">
        {items.map((item) => {
          const active = pathname === item.url
          return (
            <Collapsible className=" items-center" key={item.title} asChild defaultOpen={item.isActive}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={`!h-14  ${active ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => handleSideBarClick(item.url)}
                    className="flex items-center gap-2 w-full text-left"
                  >
                    <item.icon className="!w-6 !h-6" />
                    <span className="text-lg">{item.title}</span>
                  </button>
                </SidebarMenuButton>

                {item.items?.length ? (
                  <>
                    <CollapsibleTrigger asChild className="!h-10 !p-2">
                      <SidebarMenuAction className=" data-[state=open]:rotate-90 transition-transform duration-200">
                        <ChevronRight className="!h-6 !w-6" />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub className="space-y-0">
                        {item.items?.map((subItem) => {
                          const subActive = pathname === subItem.url
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className={`pl-6 !w-53 rounded-md ${
                                  subActive
                                    ? "bg-sidebar-accent text-primary font-medium"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={() => handleSideBarClick(subItem.url)}
                                  className="w-full text-left"
                                >
                                  {subItem.title}
                                </button>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
