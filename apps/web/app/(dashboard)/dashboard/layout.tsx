"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Bot, Sliders, LogOut } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";
import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@repo/ui/components/ui/avatar";
import { useAuthStore } from "@/store/auth-store";

const NAV_ITEMS = [
  { value: "scanner", label: "Scanner", url: "/dashboard", icon: Shield },
  {
    value: "agents",
    label: "Agents",
    url: "/dashboard/ai-hub/agents",
    icon: Bot,
  },
  {
    value: "config",
    label: "Config",
    url: "/dashboard/ai-hub/fine-tuning",
    icon: Sliders,
  },
] as const;

function getActiveTab(pathname: string): string {
  if (pathname === "/dashboard") return "scanner";
  if (pathname.startsWith("/dashboard/ai-hub/agents")) return "agents";
  return "scanner";
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const activeTab = getActiveTab(pathname);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border px-6">
        <span className="mr-4 text-sm font-semibold text-foreground">
          Hydroid
        </span>

        <Tabs value={activeTab}>
          <TabsList>
            {NAV_ITEMS.map((item) => (
              <TabsTrigger key={item.value} value={item.value} asChild>
                <Link href={item.url} className="gap-1.5">
                  <item.icon className="size-3.5" />
                  {item.label}
                </Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Avatar className="size-6">
                  <AvatarFallback className="text-xs">
                    {(user?.name || user?.email || "A").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm text-muted-foreground sm:inline">
                  {user?.name || "Admin"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 size-4" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
