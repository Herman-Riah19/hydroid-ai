"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Brain, Image as ImageIcon, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function ActionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Centre d'Actions</h1>
          <p className="text-gray-500 mt-1">
            Lancez des opérations d'analyse et de sécurité
          </p>
        </div>
      </div>

      {/* Main Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/dashboard/ai-hub/security">
          <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 cursor-pointer transition-all hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gray-800">
                  <Shield className="h-8 w-8 text-gray-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100">
                    Security Scanner
                  </h3>
                  <p className="text-sm text-gray-500">
                    Scan de vulnérabilités
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/actions/analyze">
          <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 cursor-pointer transition-all hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gray-800">
                  <Brain className="h-8 w-8 text-gray-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100">Analyse IA</h3>
                  <p className="text-sm text-gray-500">Analyse intelligente</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/actions/image">
          <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 cursor-pointer transition-all hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gray-800">
                  <ImageIcon className="h-8 w-8 text-gray-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100">
                    Génération Image
                  </h3>
                  <p className="text-sm text-gray-500">Création visuelle IA</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Quick Scan */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            <Zap className="h-5 w-5 text-gray-400" />
            Security Scanner
          </CardTitle>
          <CardDescription className="text-gray-500">
            Scannez les vulnérabilités de n'importe quel site web
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/dashboard/ai-hub/security">
            <Button className="w-full bg-gray-700 hover:bg-gray-600 h-12">
              <Shield className="h-5 w-5 mr-2" />
              Lancer un Scan de Sécurité
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
