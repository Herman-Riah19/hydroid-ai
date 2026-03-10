"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@repo/ui/components/ui/card";

type CardPartnersProps = {
  logo: string;
  enterprise: string;
  link: string;
};

export function CardPartners({ logo, enterprise, link }: CardPartnersProps) {
  const [hover, setHover] = React.useState(false);
  return (
    <Card className="m-2 text-center bg-primary dark:bg-primary-foreground text-white lg:h-40 xl:h-52 2xl:h-[15vw] md:w-[20vw] sm:w-[30vw]">
      <Link href={link} className="flex flex-row justify-center group">
        <CardContent
          className={` ${enterprise === "ADSEO" ? "max-h-32 max-w-32" : "max-h-50 max-w-50"}`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Image
            src={logo}
            alt="image"
            height={50}
            width={50}
            className={`opacity-100 duration-300  h-[10vw] w-screen md:mt-[2.5vw]`}
          />
        </CardContent>
      </Link>
    </Card>
  );
}
