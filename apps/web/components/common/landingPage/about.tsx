import React from "react";
import { ArrowRight, Shield, Bug, Globe, Search } from "lucide-react";
import { Card, CardHeader, CardContent } from "@repo/ui/components/ui/card";
import { Typography } from "@repo/ui/components/ui/typography";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import Link from "next/link";

export function About() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Card className="z-10 w-full max-w-4xl mx-4 p-8">
        <CardHeader className="flex justify-center">
          <ul className="flex gap-3">
            {["Scanner", "Auditer", "Sécuriser", "Analyser"].map((t) => (
              <Badge key={t}>{t}</Badge>
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
              Hydroid Security Scanner
            </Typography>

            <Typography
              variant="h6"
              color="primary"
              className="max-w-2xl text-base md:text-lg text-justify md:text-center"
            >
              Plateforme de sécurité applicative — analysez vos sites web pour
              détecter les vulnérabilités, testez les injections SQL, inspectez
              les en-têtes de sécurité, et bien plus.
            </Typography>

            <Typography
              variant="h6"
              color="primary"
              className="max-w-2xl text-base md:text-lg text-justify md:text-center"
            >
              Scanner intelligent avec streaming en temps réel, détection XSS,
              CORS, cookies, SSL/TLS et rapports d&apos;audit complets.
            </Typography>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
              <Link href="/login">
                <Button variant="secondary" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Scanner votre site
                  <ArrowRight />
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="ghost" className="flex items-center gap-2">
                  Créer un compte
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4 w-full max-w-lg">
              {[
                {
                  icon: Bug,
                  label: "SQL Injection",
                  desc: "Détection avancée",
                },
                { icon: Globe, label: "Web Scan", desc: "Headers, CORS, SSL" },
                { icon: Search, label: "XSS Scanner", desc: "15+ payloads" },
              ].map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-muted/30"
                >
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <span className="text-xs font-medium">{label}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
