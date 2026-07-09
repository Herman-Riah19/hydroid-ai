"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/store/auth-store"
import { Avatar, AvatarFallback } from "@repo/ui/components/ui/avatar"
import { MoreVertical, LogOut, Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu"

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Principal",
      items: [
        {
          title: "Tableau de bord",
          url: "/dashboard",
        },
        {
          title: "Security Scanner",
          url: "/dashboard/ai-hub/security",
        },
        {
          title: "Scraping",
          url: "/dashboard/actions/scraping",
        },
      ],
    },
    {
      title: "Intelligence",
      items: [
        {
          title: "Agents",
          url: "/dashboard/ai-hub/agents",
        },
        {
          title: "Fine-Tuning",
          url: "/dashboard/ai-hub/fine-tuning",
        },
      ],
    },
    {
      title: "Système",
      items: [
        {
          title: "Configuration",
          url: "/dashboard/config",
        },
        {
          title: "Modèles IA",
          url: "/dashboard/models",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0] as string}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((subItem) => {
                      const isActive =
                        subItem.url === "/dashboard"
                          ? pathname === "/dashboard"
                          : pathname === subItem.url || pathname.startsWith(subItem.url + "/")
                      return (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton asChild isActive={isActive}>
                            <Link href={subItem.url}>{subItem.title}</Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-2.5 rounded-md p-2 text-sm transition-colors hover:bg-sidebar-accent text-sidebar-foreground text-left cursor-pointer border-none bg-transparent">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-muted text-muted-foreground text-xs font-semibold">
                  {(user?.name || user?.email || "A").charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-foreground leading-tight">
                  {user?.name || "Admin"}
                </p>
                <p className="truncate text-xs text-muted-foreground leading-tight">
                  {user?.email || "admin@hydroid.ai"}
                </p>
              </div>
              <MoreVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="start"
            className="w-56 bg-popover text-popover-foreground border border-border"
          >
            <DropdownMenuItem
              onClick={() => router.push("/dashboard/config")}
              className="flex items-center text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configuration
            </DropdownMenuItem>
            <DropdownMenuSeparator className="border-t border-border my-1" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center text-sm text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer px-3 py-2 rounded-md"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
