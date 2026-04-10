"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  Brain,
  Shield,
  Zap,
  Cpu,
  Activity,
  Settings,
  User,
  ChevronDown,
  ChevronRight,
  Terminal,
  Layers,
  Search,
  Globe,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ElementType;
  badge?: string;
  children?: { title: string; href: string }[];
}

const mainNav: NavItem[] = [
  { title: "Tableau de bord", href: "/dashboard", icon: Activity },
  { title: "OSINT", href: "/dashboard/actions/osint", icon: Search },
  { title: "Scraping", href: "/dashboard/actions/scraping", icon: Globe },
];

const aiHub: NavItem[] = [
  { title: "AI Hub", href: "/dashboard/ai-hub", icon: Brain },
  { title: "Agents", href: "/dashboard/ai-hub/agents", icon: Terminal },
  { title: "Fine-Tuning", href: "/dashboard/ai-hub/fine-tuning", icon: Layers },
];

const system: NavItem[] = [
  { title: "Configuration", href: "/dashboard/config", icon: Settings },
  { title: "Modèles IA", href: "/dashboard/models", icon: Cpu },
];

interface SidebarProps {
  className?: string;
}

function clsx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

function NavGroup({ item, pathname }: { item: NavItem; pathname: string }) {
  const [isOpen, setIsOpen] = useState(true);
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/");

  const Icon = item.icon;

  if (item.children) {
    return (
      <div className="mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            "flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors",
            isActive
              ? "bg-gray-800 text-gray-100"
              : "text-gray-400 hover:bg-gray-800 hover:text-gray-100",
          )}
        >
          <div className="flex items-center gap-3">
            {Icon && <Icon className="h-4 w-4" />}
            {item.title}
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        {isOpen && (
          <div className="ml-4 mt-1 space-y-1">
            {item.children.map((child) => {
              const isChildActive = pathname === child.href;

              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isChildActive
                      ? "bg-gray-800 text-gray-100"
                      : "text-gray-400 hover:bg-gray-800 hover:text-gray-100",
                  )}
                >
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
      className={clsx(
        "flex items-center gap-3 px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-colors",
        isActive
          ? "bg-gray-800 text-gray-100 border-l-2 border-gray-400"
          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100",
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {item.title}
      {item.badge && (
        <Badge
          variant="secondary"
          className="ml-auto text-xs bg-gray-700 text-gray-300"
        >
          {item.badge}
        </Badge>
      )}
    </Link>
  );
}

export function DashboardSidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        "flex flex-col h-full bg-black border-r border-gray-800",
        className,
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-800">
        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
          <Shield className="h-5 w-5 text-black" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-100">Hydroid</h1>
          <p className="text-xs text-gray-500">Command Center</p>
        </div>
      </div>

      {/* Status */}
      <div className="px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-gray-400">Ollama</span>
          <span className="mx-1">|</span>
          <span className="w-2 h-2 rounded-full bg-gray-500"></span>
          <span className="text-gray-400">LM Studio</span>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        {/* Main Section */}
        <div className="mb-6">
          <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Principal
          </p>
          {mainNav.map((item: NavItem) => (
            <NavGroup key={item.href} item={item} pathname={pathname} />
          ))}
        </div>

        {/* AI Hub */}
        <div className="mb-6">
          <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Intelligence IA
          </p>
          {aiHub.map((item) => (
            <NavGroup key={item.href} item={item} pathname={pathname} />
          ))}
        </div>

        {/* System */}
        <div>
          <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Système
          </p>
          {system.map((item) => (
            <NavGroup key={item.href} item={item} pathname={pathname} />
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-900">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="h-4 w-4 text-black" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-100 truncate">Admin</p>
            <p className="text-xs text-gray-500 truncate">admin@hydroid.ai</p>
          </div>
          <Settings className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-300" />
        </div>
      </div>
    </div>
  );
}
