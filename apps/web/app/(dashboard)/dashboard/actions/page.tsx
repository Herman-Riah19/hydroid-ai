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
          <h1 className="text-3xl font-bold text-white">Centre d'Actions</h1>
          <p className="text-gray-400 mt-1">
            Lancez des opérations de renseignement et d'analyse
          </p>
        </div>
      </div>

      {/* Main Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/dashboard/actions/osint">
          <Card className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border-cyan-800/50 hover:border-cyan-600/50 cursor-pointer transition-all hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/20">
                  <Search className="h-8 w-8 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">OSINT</h3>
                  <p className="text-sm text-cyan-300">
                    Recherche d'intelligence
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/actions/scraping">
          <Card className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 border-emerald-800/50 hover:border-emerald-600/50 cursor-pointer transition-all hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/20">
                  <Globe className="h-8 w-8 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Scraping</h3>
                  <p className="text-sm text-emerald-300">
                    Collecte de données web
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/actions/analyze">
          <Card className="bg-gradient-to-br from-violet-900/50 to-purple-900/50 border-violet-800/50 hover:border-violet-600/50 cursor-pointer transition-all hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-violet-500/20">
                  <Brain className="h-8 w-8 text-violet-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Analyse IA</h3>
                  <p className="text-sm text-violet-300">
                    Analyse intelligente
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/actions/image">
          <Card className="bg-gradient-to-br from-rose-900/50 to-pink-900/50 border-rose-800/50 hover:border-rose-600/50 cursor-pointer transition-all hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-rose-500/20">
                  <ImageIcon className="h-8 w-8 text-rose-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Génération Image</h3>
                  <p className="text-sm text-rose-300">Création visuelle IA</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Quick Start Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Search */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Recherche Rapide
            </CardTitle>
            <CardDescription>Lancez une recherche instantanée</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Entrez un nom, email, domaine..."
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button className="bg-cyan-600 hover:bg-cyan-700">
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
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-cyan-500" />
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
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {search.name}
                      </p>
                      <p className="text-xs text-gray-400">{search.time}</p>
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
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Cpu className="h-5 w-5 text-violet-500" />
            Configuration IA
          </CardTitle>
          <CardDescription>
            Choisissez votre provider pour les opérations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-800/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="font-medium text-white">Ollama</span>
                </div>
                <Badge className="bg-orange-500/20 text-orange-400">
                  Actif
                </Badge>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Modèles: qwen2.5, llama3.2, mistral
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-gray-700"
              >
                Configurer
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-800/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="font-medium text-white">LM Studio</span>
                </div>
                <Badge variant="outline" className="text-gray-400">
                  Inactif
                </Badge>
              </div>
              <p className="text-sm text-gray-400 mb-3">Port: localhost:1234</p>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-gray-700"
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
