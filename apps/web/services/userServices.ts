import { useAuthStore, User } from "@/store/auth-store";
import { LoginResponse } from "@/types/authType";
import { headersAuthFetch } from "@/utils/header-fetch";

export class UserServices {
  static async getAllUsers(token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
      header,
    );
    return res.json();
  }

  static async getUserById(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
      header,
    );
    return res.json();
  }

  static async register(userData: {
    email: string;
    password: string;
    name: string;
  }) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      },
    );

    return res.json();
  }

  static async login(credentials: {
    email: string;
    password: string;
  }): Promise<LoginResponse> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      },
    );
    const data = await res.json();

    useAuthStore.getState().login(data.user, data.token);

    return data;
  }

  // Helper function to check if user is authenticated
  static isAuthenticated(): boolean {
    return useAuthStore.getState().isAuthenticated;
  }

  // Helper function to get current token
  static getToken(): string | null {
    return useAuthStore.getState().token;
  }

  // Helper function to get current user
  static getCurrentUserFromStore(): User | null {
    return useAuthStore.getState().user;
  }

  static async getProfile(token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`,
      header,
    );

    return res.json();
  }

  static async updateProfile(token: string, userData: any) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`,
      {
        method: "PUT",
        headers: header.headers,
        body: JSON.stringify(userData),
      },
    );

    return res.json();
  }
}
