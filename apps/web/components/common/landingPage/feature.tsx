"use client"

import { FeatureProps } from "@/components/card/card-features";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@repo/ui/components/ui/card";
import { Progress } from "@repo/ui/components/ui/progress";
import { Typography } from "@repo/ui/components/ui/typography";
import { Link } from "lucide-react";
import React, { useState, useEffect } from "react";
const FeaturesData = [
  { 
    title: "Déploiement Simplifié",
    description: "Déployez vos smart contracts en quelques clics avec notre interface intuitive.",
    image: "/images/feature-deployment.jpg",
    link: "/features/deployment",
    details: "Notre fonctionnalité de déploiement simplifié vous permet de lancer vos smart contracts rapidement et facilement. Grâce à une interface utilisateur conviviale, vous pouvez configurer les paramètres essentiels, choisir le réseau blockchain approprié, et déployer vos contrats sans avoir besoin de compétences techniques approfondies. Gagnez du temps et réduisez les erreurs grâce à notre processus guidé."
  },
  { 
    title: "Audit Intégré",
    description: "Assurez la sécurité de vos smart contracts avec des audits automatisés et manuels.",
    image: "/images/feature-audit.jpg",
    link: "/features/audit",
    details: "La sécurité est primordiale dans le monde des smart contracts. Notre fonctionnalité d'audit intégré combine des analyses automatisées  et des revues manuelles pour identifier les vulnérabilités potentielles dans vos contrats. Recevez des rapports détaillés et des recommandations pour renforcer la sécurité de vos déploiements, garantissant ainsi la confiance de vos utilisateurs et partenaires."
  },
  {
    title: "Surveillance en Temps Réel",
    description: "Surveillez les performances et les activités de vos smart contracts en temps réel.",
    image: "/images/feature-monitoring.jpg",
    link: "/features/monitoring",
    details: "Restez informé de l'état de vos smart contracts grâce à notre système de surveillance en temps réel. Recevez des notifications instantanées sur les transactions, les erreurs et les performances de vos contrats. Notre tableau de bord intuitif vous permet d'analyser les données clés et de prendre des décisions éclairées pour optimiser vos opérations blockchain."
  },
  {
    title: "Gouvernance Décentralisée",
    description: "Implémentez des mécanismes de gouvernance pour une gestion collaborative de vos smart contracts.",
    image: "/images/feature-governance.jpg",
    link: "/features/governance",
    details: "La gouvernance décentralisée est essentielle pour les projets blockchain collaboratifs. Notre fonctionnalité de gouvernance vous permet de définir des règles et des processus pour la prise de décision collective concernant vos smart contracts. Impliquez votre communauté dans les mises à jour, les modifications et les évolutions de vos contrats, renforçant ainsi la transparence et la confiance au sein de votre écosystème."
  },
];

function FeatureCard({
  feature,
  isActive,
  onClick,
  progressValue,
}: {
  feature: FeatureProps;
  isActive: boolean;
  onClick: () => void;
  progressValue: number;
}) {
  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer transition-all ${
        isActive ? "border-primary bg-primary/10" : "hover:border-primary/50"
      }`}
    >
      <CardHeader>
        <CardTitle>{feature.title}</CardTitle>
        <CardDescription>{feature.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progressValue} className="h-2" />
      </CardContent>
    </Card>
  );
}

export function Feature() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const activeFeature = FeaturesData[activeIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (progressValue < 100) {
      interval = setInterval(() => {
        setProgressValue((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setActiveIndex((prevIndex) => (prevIndex + 1) % FeaturesData.length);
            return 0; // Reset progress for the next feature
          }
          return prev + 10; // Increment progress
        });
      }, 100); // Adjust the interval time as needed
    }

    return () => clearInterval(interval);
  }, [progressValue, activeIndex]);

  return (
    <div className="border-2 rounded-md m-2 bg-muted min-h-screen">
      <div className="w-full text-start p-7">
        <Typography
          variant="h1"
          color="primary"
          className="uppercase mb-2 bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text"
        >
          Smart Contract Management
        </Typography>
        <Link href="/auth/login">
          <Button
            variant="default"
            className="text-lg font-normal uppercase rounded-[10vw]"
          >
            Get Started
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-6 p-7 h-full">
        {/* Left Column - Features List */}
        <div className="flex flex-col gap-4">
          <Typography variant="h2" className="mb-4" color={"primary"}>
            Features
          </Typography>
          {FeaturesData.map((feat, index) => (
            <FeatureCard
              key={index}
              feature={feat}
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              progressValue={activeIndex === index ? progressValue : 0}
            />
          ))}
        </div>

        {activeFeature && (
          <Card>
            <CardHeader>
              <img
                src={activeFeature.image}
                alt={activeFeature.title}
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              <CardTitle>{activeFeature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography variant="p" className="mb-6" color={"primary"}>
                {activeFeature.details || activeFeature.description}
              </Typography>
              <Link href={activeFeature.link}>
                <Button variant="default" className="w-full">
                  Access Feature
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
