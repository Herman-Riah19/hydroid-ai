"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@repo/ui/components/ui/avatar";
import DarkTheme from "@/components/dark-theme";
import { NavbarSheet } from "@/components/navbar/navbar-sheet";

export function Navbar() {

  useEffect(() => {
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();

        const targetId = link.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId ?? "");

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }, []);

  const pages = [
    {
      name: 'Acceuil',
      link: `#home`,
    },
    {
      name: 'A propos',
      link: `#about`,
    },
    {
      name: 'Features',
      link: `#features`,
    },
    {
      name: 'Services',
      link: `#services`,
    },
    {
      name: "Team",
      link: `#team`,
    },
    {
      name: "Contact",
      link: `#newsletter`,
    },
  ];

  return (
    <header className="sticky top-0 flex h-16 z-10 items-center gap-1 border-b bg-background backdrop-blur supports-backdrop-filter:bg-background/60 px-4 md:px-6">
      <Link
        href="/"
        className="flex items-center gap-6 text-lg font-semibold md:text-base w-full"
      >
        <Avatar>
          <AvatarImage src="/assets/logo.jpg" />
          <AvatarFallback>Riah</AvatarFallback>
        </Avatar>
        <span className="font-semibold sm:hidden md:block">Riah</span>
      </Link>

      <NavbarSheet pages={pages} />
      <nav className="flex flex-col text-lg font-medium sm:hidden md:flex justify-end md:flex-row md:items-center md:gap-3 md:text-sm lg:gap-6">
        {pages.map((page) => (
          <a
            key={page.name}
            href={page.link}
            className="nav-link text-muted-foreground transition-colors hover:text-foreground w-[4vw]"
          >
            {page.name}
          </a>
        ))}
      </nav>
      
      <div className="flex w-full justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <DarkTheme />
      </div>
    </header>
  );
};

