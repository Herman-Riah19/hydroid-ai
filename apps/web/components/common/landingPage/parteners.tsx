import { CardPartners } from "@/components/card/card-partners";
import { AnimateFeature } from "@repo/ui/components/animation/AnimateFeature";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { Typography } from "@repo/ui/components/ui/typography";
import React from "react";

export function Parteners() {
  return (
    <div className="pb-[10vw] pt-[10vw]" id="partners">
      <Typography
        variant="h1"
        color="primary"
        className="text-center bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text uppercase"
      >
        Partners
      </Typography>
      <Typography variant="body1" color="secondary" className="text-center">
        We take pride in collaborating with our partners who help us provide the
        best services to our clients.If you&apos;d like to become our partner,
        please contact us.
      </Typography>
      <ScrollArea className="w-full whitespace-nowrap">
        <AnimateFeature>
          <div className="flex gap-1">
            <CardPartners
              logo="/next.svg"
              enterprise="Nextjs"
              link="https://www.nextjs.org/"
            />
            <CardPartners
              logo="/vercel.svg"
              enterprise="Vercel"
              link="https://www.vercel.com"
            />
          </div>
        </AnimateFeature>
      </ScrollArea>
    </div>
  );
}
