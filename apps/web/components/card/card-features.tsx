"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@repo/ui/components/ui/card";

export interface FeatureProps {
  title: string;
  description: string;
  link: string;
  image: string;
}

export const CardFeature: React.FC<FeatureProps> = ({
  title,
  description,
  image,
  link,
}) => {
  return (
    <Card className="grid grid-cols-3 sm:block md:grid gap-2">
      <CardHeader className="w-[23vw] h-[11vw] col-span-2">
        <CardTitle className="text-lg sm:text-sm">{title}</CardTitle>
        <CardDescription>
          <span className="text-md text-wrap truncate sm:hidden lg:block lg:w-[30vw] xl:w-full">
            {description}
          </span>
          <Button variant="secondary">Lets</Button>
        </CardDescription>
      </CardHeader>
      <CardContent className="lg:mt-12 md:mt-2 sm:mt-20 static">
        <Image
          src={image}
          alt="Generated"
          height={120}
          width={120}
          className="rounded-2xl bg-secondary h-32"
        />
      </CardContent>
    </Card>
  );
};
