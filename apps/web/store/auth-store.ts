import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setCookieTokens, clearCookieTokens } from "@/services/cookieService";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (user: User, token: string) => {
        await setCookieTokens(token);

        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      logout: async () => {
        await clearCookieTokens();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setToken: (token: string) => {
        set({ token });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
