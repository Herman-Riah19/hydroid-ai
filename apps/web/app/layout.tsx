import localFont from "next/font/local";
import "@repo/ui/globals.css";
import { ThemeProviders } from "@/components/theme-provider";
import type { ReactNode } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased `}
      >
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  );
}
