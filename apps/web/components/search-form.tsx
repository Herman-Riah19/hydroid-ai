"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "@repo/ui/components/ui/input"
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar"

export function SearchForm() {
  return (
    <SidebarGroup className="p-0">
      <SidebarGroupContent className="relative">
        <form onSubmit={(e) => e.preventDefault()} className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 opacity-50 text-sidebar-foreground" />
          <Input
            type="search"
            placeholder="Rechercher..."
            className="pl-9 h-9 w-full bg-sidebar-accent/50 border-sidebar-border focus-visible:ring-sidebar-ring text-sidebar-foreground"
          />
        </form>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
