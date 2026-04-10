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
import { Badge } from "@repo/ui/components/ui/badge";
import {
  Search,
  UserSearch,
  Mail,
  Phone,
  Globe,
  MapPin,
  Image as ImageIcon,
  Loader2,
  Shield,
  Database,
  ExternalLink,
  Copy,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { OsintServices } from "@/services/osintServices";
import { useAuthStore } from "@/store/auth-store";

export default function OsintPage() {
  const [searchType, setSearchType] = useState("person");
  const [target, setTarget] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { user, token } = useAuthStore((state) => {
    return {
      user: state.user,
      token: state.token,
    };
  });

  const searchTypes = [
    {
      id: "person",
      name: "Personne",
      icon: UserSearch,
      description: "Recherche par nom",
    },
    {
      id: "email",
      name: "Email",
      icon: Mail,
      description: "Recherche par email",
    },
    {
      id: "phone",
      name: "Téléphone",
      icon: Phone,
      description: "Recherche par téléphone",
    },
    {
      id: "domain",
      name: "Domaine",
      icon: Globe,
      description: "Recherche par domaine",
    },
    {
      id: "image",
      name: "Image",
      icon: ImageIcon,
      description: "Recherche d'image inverse",
    },
    {
      id: "location",
      name: "Localisation",
      icon: MapPin,
      description: "Recherche géographique",
    },
  ];

  const handleSearch = async () => {
    if (!target) return;

    setIsSearching(true);

    const response = await OsintServices.createSearch(
      {
        userId: user?.id || "",
        query: target,
        searchType: searchType,
      },
      token || "",
    );

    console.log("resultat: ", response);
    // Simulate search - in production this would call the API
    setTimeout(() => {
      setResults({
        target,
        type: searchType,
        confidence: response.confidence,
        findings: response.result.findings,
        sources: response.result.sources,
      });
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">OSINT</h1>
          <p className="text-gray-500 mt-1">
            Recherche d'intelligence open source
          </p>
        </div>
        <Badge variant="outline" className="gap-1">
          <Database className="h-3 w-3" />
          247 recherches
        </Badge>
      </div>

      {/* Search Type Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {searchTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setSearchType(type.id)}
              className={`p-4 rounded-xl border transition-all ${
                searchType === type.id
                  ? "bg-gray-800 border-gray-500 text-gray-100"
                  : "bg-gray-900 border-gray-800 text-gray-500 hover:border-gray-700"
              }`}
            >
              <Icon className="h-5 w-5 mx-auto mb-2" />
              <span className="text-sm font-medium">{type.name}</span>
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex gap-3">
            <Input
              placeholder={`Entrez ${searchTypes.find((t) => t.id === searchType)?.description.toLowerCase()}...`}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="bg-gray-800 border-gray-700 text-gray-100 text-lg h-12"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              onClick={handleSearch}
              disabled={isSearching || !target}
              className="bg-gray-700 hover:bg-gray-600 h-12 px-8"
            >
              {isSearching ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Rechercher
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Results */}
          <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-100 flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-400" />
                Résultats de Recherche
              </CardTitle>
              <CardDescription className="text-gray-500">
                Cible: {results.target}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Risk Score */}

              {/* Emails */}
              {results.findings.emails &&
                results.findings.emails.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Emails trouvés
                    </h4>
                    <div className="space-y-2">
                      {results.findings.emails.map(
                        (email: string, i: number) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-800"
                          >
                            <span className="text-gray-100">{email}</span>
                            <Button variant="ghost" size="sm">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

              {/* Phones */}
              {results.findings.phones &&
                results.findings.phones.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Téléphones trouvés
                    </h4>
                    <div className="space-y-2">
                      {results.findings.phones.map(
                        (phone: string, i: number) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-800"
                          >
                            <span className="text-gray-100">{phone}</span>
                            <Button variant="ghost" size="sm">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

              {/* Social Profiles */}
              {results.findings.socialProfiles &&
                results.findings.socialProfiles.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Profils Sociaux
                    </h4>
                    <div className="space-y-2">
                      {results.findings.socialProfiles.map(
                        (profile: string, i: number) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-800"
                          >
                            <span className="text-gray-100">{profile}</span>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
              {results.sources && results.sources.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Sources
                  </h4>
                  <div className="space-y-2">
                    {results.sources.map((profile: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-800"
                      >
                        <span className="text-gray-100">{profile}</span>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-100 text-lg">Résumé</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 rounded-lg bg-gray-800">
                <div className="text-4xl font-bold text-gray-300 mb-2">
                  {(results.confidence * 100).toFixed(0)}%
                </div>
                <p className="text-sm text-gray-500">Confiance</p>
              </div>

              <Button variant="outline" className="w-full border-gray-700">
                <RefreshCw className="h-4 w-4 mr-2" />
                Nouvelle Recherche
              </Button>

              <Button variant="outline" className="w-full border-gray-700">
                <Database className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
