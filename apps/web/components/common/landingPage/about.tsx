import React from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardHeader, CardContent } from "@repo/ui/components/ui/card";
import { Typography } from "@repo/ui/components/ui/typography";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";

export function About() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">

      <Card className="z-10 w-full max-w-4xl mx-4 p-8">
        <CardHeader className="flex justify-center">
          <ul className="flex gap-3">
            {["Déployer", "Auditer", "Surveiller", "Gouverner"].map((t) => (
              <Badge key={t} >{t}</Badge>
            ))}
          </ul>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center text-center gap-6 py-6">
            <Typography
              variant="h2"
              color="secondary"
              className="capitalize text-4xl md:text-5xl font-bold bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text"
            >
              Midas Contract Manager
            </Typography>

            <Typography
              variant="h6"
              color="primary"
              className="max-w-2xl text-base md:text-lg text-justify md:text-center"
            >
              Midas Contract Manager — plateforme de gestion de smart contracts
              pour entreprises. Déployez, gérez et surveillez vos contrats
              blockchain avec sécurité, traçabilité et conformité.
            </Typography>

            <Typography
              variant="h6"
              color="primary"
              className="max-w-2xl text-base md:text-lg text-justify md:text-center"
            >
              Fonctionnalités clés : gestion des versions, audits intégrés,
              journalisation des événements, contrôles d'accès et déploiement
              multi-réseaux pour les environnements d'entreprise.
            </Typography>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
              <Button variant="secondary" className="flex items-center gap-2">
                Commencer
                <ArrowRight />
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                En savoir plus
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
