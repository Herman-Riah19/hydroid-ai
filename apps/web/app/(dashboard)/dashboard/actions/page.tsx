"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { Textarea } from "@repo/ui/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  Search,
  Globe,
  Brain,
  Image as ImageIcon,
  UserSearch,
  Building,
  MapPin,
  Mail,
  Phone,
  Link as LinkIcon,
  Loader2,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  Target,
  FileText,
  Database,
  Cpu,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ActionsPage() {
  const [activeTab, setActiveTab] = useState("osint");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Centre d'Actions</h1>
          <p className="text-gray-500 mt-1">
            Lancez des opérations de renseignement et d'analyse
          </p>
        </div>
      </div>

      {/* Main Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/dashboard/actions/osint">
          <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 cursor-pointer transition-all hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gray-800">
                  <Search className="h-8 w-8 text-gray-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100">OSINT</h3>
                  <p className="text-sm text-gray-500">
                    Recherche d'intelligence
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/actions/scraping">
          <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 cursor-pointer transition-all hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gray-800">
                  <Globe className="h-8 w-8 text-gray-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100">Scraping</h3>
                  <p className="text-sm text-gray-500">
                    Collecte de données web
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

      {/* Quick Start Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Search */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100 flex items-center gap-2">
              <Zap className="h-5 w-5 text-gray-400" />
              Recherche Rapide
            </CardTitle>
            <CardDescription className="text-gray-500">
              Lancez une recherche instantanée
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Entrez un nom, email, domaine..."
                className="bg-gray-800 border-gray-700 text-gray-100"
              />
              <Button className="bg-gray-700 hover:bg-gray-600">
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-gray-800"
              >
                <UserSearch className="h-3 w-3 mr-1" />
                Personne
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-gray-800"
              >
                <Mail className="h-3 w-3 mr-1" />
                Email
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-gray-800"
              >
                <Globe className="h-3 w-3 mr-1" />
                Domaine
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-gray-800"
              >
                <Phone className="h-3 w-3 mr-1" />
                Téléphone
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recent Searches */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100 flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-400" />
              Recherches Récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                {
                  name: "John Doe - Profile",
                  type: "person",
                  time: "Il y a 5 min",
                  status: "completed",
                },
                {
                  name: "example.com - Scraping",
                  type: "scraping",
                  time: "Il y a 15 min",
                  status: "completed",
                },
                {
                  name: "Analyse sentiment",
                  type: "analysis",
                  time: "Il y a 30 min",
                  status: "running",
                },
              ].map((search, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-800 hover:bg-gray-750 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-100">
                        {search.name}
                      </p>
                      <p className="text-xs text-gray-500">{search.time}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {search.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Provider Selection */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-gray-400" />
            Configuration IA
          </CardTitle>
          <CardDescription className="text-gray-500">
            Choisissez votre provider pour les opérations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span className="font-medium text-gray-100">Ollama</span>
                </div>
                <Badge className="bg-gray-700 text-gray-300">Actif</Badge>
              </div>
              <p className="text-sm text-gray-500 mb-3">
                Modèles: qwen2.5, llama3.2, mistral
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-gray-600"
              >
                Configurer
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                  <span className="font-medium text-gray-100">LM Studio</span>
                </div>
                <Badge variant="outline" className="text-gray-500">
                  Inactif
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mb-3">Port: localhost:1234</p>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-gray-600"
              >
                Connecter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
