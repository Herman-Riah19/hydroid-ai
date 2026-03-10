import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export function useAuth(requireAuth: boolean = true) {
  const router = useRouter();
  const isAuthenticated = useAuthStore(
    (state: { isAuthenticated: any }) => state.isAuthenticated,
  );
  const user = useAuthStore((state: { user: any }) => state.user);

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push("/login");
    } else if (!requireAuth && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, requireAuth, router]);

  return {
    isAuthenticated,
    user,
    loading: false,
  };
}
