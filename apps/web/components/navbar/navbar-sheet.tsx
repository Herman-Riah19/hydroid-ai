'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@repo/ui/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@repo/ui/components/ui/sheet';
import { Menu } from 'lucide-react';

type NavSheetProps = {
    pages: {
        name: string;
        link: string;
    }[]
}
export function NavbarSheet ({ pages }: NavSheetProps) {
    const route = useRouter()
    const [open, setOpen] = useState(false);

    const handleClose = (link: string) => {
        setOpen(!open);
        route.push(link);
    }

    return (
        <div className="flex w-25 items-center gap-4 md:ml-auto md:gap-2 lg:gap-8">
            <Sheet open={open}>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                        onClick={(e) => setOpen(true)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" onCloseAutoFocus={e => setOpen(false)}>
                    <nav className="grid gap-2 text-lg font-medium">
                        <Button
                            variant="destructive"
                            className="text-primary hover:text-foreground m-0 bg-transparent "
                            onClick={e => {
                                e.preventDefault()
                                handleClose("/")
                            }}>
                            Midas
                        </Button>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                variant="destructive"
                                className="nav-link text-primary hover:text-foreground m-0 bg-transparent "
                                onClick={e => {
                                    e.preventDefault()
                                    handleClose(page.link)
                                }}>
                                {page.name}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    )
}
