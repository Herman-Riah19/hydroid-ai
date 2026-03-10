"use client";

import { useAuthStore } from "@/store/auth-store";
import { Button } from "@repo/ui/components/ui/button";
import { useRouter } from "next/navigation";

export function UserMenu() {
  const user = useAuthStore((state) => state.user);
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
    <div className="flex items-center gap-4">
      <div className="text-sm">
        <div className="font-medium">{user?.name || user?.email}</div>
        <div className="text-gray-500">{user?.role}</div>
      </div>
      <Button onClick={handleLogout} variant="outline" size="sm">
        Déconnexion
      </Button>
    </div>
  );
}
