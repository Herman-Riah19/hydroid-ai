"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { Button } from "@repo/ui/components/ui/button";
import { Separator } from "@repo/ui/components/ui/separator";
import { Avatar, AvatarFallback } from "@repo/ui/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import {
  Brain,
  Shield,
  Cpu,
  Activity,
  Settings,
  ChevronDown,
  ChevronRight,
  Terminal,
  Layers,
  Search,
  Globe,
  LogOut,
  PanelLeftClose,
  PanelLeft,
  MoreVertical,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ElementType;
  badge?: string;
  children?: { title: string; href: string; icon?: React.ElementType }[];
}

const mainNav: NavItem[] = [
  { title: "Tableau de bord", href: "/dashboard", icon: Activity },
  {
    title: "Security Scanner",
    href: "/dashboard/ai-hub/security",
    icon: Shield,
    badge: "New",
  },
  { title: "Scraping", href: "/dashboard/actions/scraping", icon: Globe },
];

const aiHub: NavItem[] = [
  {
    title: "AI Hub",
    href: "/dashboard/ai-hub",
    icon: Brain,
    children: [
      { title: "Agents", href: "/dashboard/ai-hub/agents", icon: Terminal },
      {
        title: "Fine-Tuning",
        href: "/dashboard/ai-hub/fine-tuning",
        icon: Layers,
      },
    ],
  },
];

const systemNav: NavItem[] = [
  { title: "Configuration", href: "/dashboard/config", icon: Settings },
  { title: "Modèles IA", href: "/dashboard/models", icon: Cpu },
];

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

function NavLink({
  item,
  pathname,
  collapsed,
}: {
  item: NavItem;
  pathname: string;
  collapsed: boolean;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const isActive =
    item.href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname === item.href || pathname.startsWith(item.href + "/");

  const Icon = item.icon;

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center w-full gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
          )}
        >
          {Icon && <Icon className="h-4 w-4 shrink-0" />}
          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.title}</span>
              {isOpen ? (
                <ChevronDown className="h-3.5 w-3.5 opacity-50" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 opacity-50" />
              )}
            </>
          )}
        </button>

        {isOpen && !collapsed && (
          <div className="mt-1 ml-4 space-y-0.5 border-l border-border pl-3">
            {item.children.map((child) => {
              const ChildIcon = child.icon;
              const isChildActive = pathname === child.href;
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm transition-colors",
                    isChildActive
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                  )}
                >
                  {ChildIcon && <ChildIcon className="h-3.5 w-3.5" />}
                  {child.title}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
      )}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      {!collapsed && <span>{item.title}</span>}
    </Link>
  );
}

function NavSection({
  label,
  items,
  pathname,
  collapsed,
}: {
  label: string;
  items: NavItem[];
  pathname: string;
  collapsed: boolean;
}) {
  return (
    <div className="space-y-1">
      {!collapsed && (
        <p className="px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-1.5">
          {label}
        </p>
      )}
      {items.map((item) => (
        <NavLink
          key={item.href}
          item={item}
          pathname={pathname}
          collapsed={collapsed}
        />
      ))}
    </div>
  );
}

interface SidebarProps {
  className?: string;
}

export function DashboardSidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-full border-r border-border bg-card transition-all duration-200",
        collapsed ? "w-[68px]" : "w-64",
        className,
      )}
    >
      {/* Logo & collapse toggle */}
      <div className="flex items-center justify-between px-4 h-16 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foreground">
            <Shield className="h-4 w-4 text-background" />
          </div>
          {!collapsed && (
            <span className="text-base font-bold tracking-tight text-foreground">
              Hydroid
            </span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>

      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          <NavSection
            label="Principal"
            items={mainNav}
            pathname={pathname}
            collapsed={collapsed}
          />
          <NavSection
            label="Intelligence"
            items={aiHub}
            pathname={pathname}
            collapsed={collapsed}
          />
          <NavSection
            label="Système"
            items={systemNav}
            pathname={pathname}
            collapsed={collapsed}
          />
        </div>
      </ScrollArea>

      <Separator />

      {/* User footer */}
      <div className="p-3 shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex w-full items-center gap-2.5 rounded-md p-2 text-sm transition-colors hover:bg-accent",
                collapsed && "justify-center",
              )}
            >
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                  {(user?.name || user?.email || "A").charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <>
                  <div className="flex-1 text-left min-w-0">
                    <p className="truncate text-sm font-medium text-foreground leading-tight">
                      {user?.name || "Admin"}
                    </p>
                    <p className="truncate text-xs text-muted-foreground leading-tight">
                      {user?.email || "admin@hydroid.ai"}
                    </p>
                  </div>
                  <MoreVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-56">
            <DropdownMenuItem onClick={() => router.push("/dashboard/config")}>
              <Settings className="h-4 w-4 mr-2" />
              Configuration
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} variant="destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
