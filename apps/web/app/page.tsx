import { Navbar } from "@/components/landingPage/navbar";
import { Hero } from "@/components/landingPage/hero";
import { Stats } from "@/components/landingPage/stats";
import { Features } from "@/components/landingPage/features";
import { HowItWorks } from "@/components/landingPage/how-it-works";
import { AiModels } from "@/components/landingPage/ai-models";
import { AiHub } from "@/components/landingPage/ai-hub";
import { Cta } from "@/components/landingPage/cta";
import { Footer } from "@/components/landingPage/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <AiModels />
        <AiHub />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
