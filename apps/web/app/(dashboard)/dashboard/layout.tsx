"use client";

import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { useAuthStore } from "@/store/auth-store";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { useRouter } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex h-screen bg-background">
     <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-background/5 shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">

            <div className="flex items-center space-x-4">
              <Badge variant="secondary">Production</Badge>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Déconnexion
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
