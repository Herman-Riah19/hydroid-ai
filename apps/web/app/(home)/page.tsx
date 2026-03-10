"use client";
import { About } from "@/components/common/landingPage/about";
import { FAQ } from "@/components/common/landingPage/faq";
import { Feature } from "@/components/common/landingPage/feature";
import { Parteners } from "@/components/common/landingPage/parteners";
import { Navbar } from "@/components/navbar/navbar";
import * as React from "react";

export default function HomePage() {
  return (
    <div className="m-4">
      <Navbar />
      <About />
      <Feature />
      <Parteners />
      <FAQ />
    </div>
  );
}
