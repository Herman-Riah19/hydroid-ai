"use server";

import { cookies } from "next/headers";

export async function setCookieTokens(access: string) {
  const cookieStore = await cookies();

  cookieStore.set("token", access, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
  });
}

export async function clearCookieTokens() {
  const cookieStore = await cookies();
  cookieStore.set("token", "", { path: "/", maxAge: 0 });
}
