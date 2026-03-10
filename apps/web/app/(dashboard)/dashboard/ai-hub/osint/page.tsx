"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import { Search, Plus, User, Building2, Box, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import {
  OsintServices,
  HumanProfileServices,
  BuildingServices,
  ObjectServices,
} from "@/services/osintServices";

const searchTypeIcons: Record<string, any> = {
  HUMAN: User,
  BUILDING: Building2,
  OBJECT: Box,
  VEHICLE: "vehicle",
  LOCATION: "location",
};

const searchStatusColors: Record<
  string,
  "default" | "secondary" | "outline" | "destructive"
> = {
  PENDING: "outline",
  PROCESSING: "secondary",
  COMPLETED: "default",
  FAILED: "destructive",
};

export default function OsintPage() {
  const { token, user } = useAuthStore();
  const [searches, setSearches] = useState<any[]>([]);
  const [humans, setHumans] = useState<any[]>([]);
  const [buildings, setBuildings] = useState<any[]>([]);
  const [objects, setObjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("searches");

  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token]);

  const loadData = async () => {
    try {
      const [searchesData, humansData, buildingsData, objectsData] =
        await Promise.all([
          OsintServices.getAllSearches(token!, { userId: user?.id }),
          HumanProfileServices.getAllProfiles(token!),
          BuildingServices.getAllBuildings(token!),
          ObjectServices.getAllObjects(token!),
        ]);
      setSearches(searchesData);
      setHumans(humansData);
      setBuildings(buildingsData);
      setObjects(objectsData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">OSINT</h1>
          <p className="text-gray-600">
            Recherches et analyse d'informations publiques
          </p>
        </div>
        <Link href="/dashboard/ai-hub/osint/search">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle Recherche
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recherches</p>
                <p className="text-2xl font-bold">{searches.length}</p>
              </div>
              <Search className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Profils humains
                </p>
                <p className="text-2xl font-bold">{humans.length}</p>
              </div>
              <User className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bâtiments</p>
                <p className="text-2xl font-bold">{buildings.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Objets</p>
                <p className="text-2xl font-bold">{objects.length}</p>
              </div>
              <Box className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="searches">Recherches</TabsTrigger>
          <TabsTrigger value="humans">Humains</TabsTrigger>
          <TabsTrigger value="buildings">Bâtiments</TabsTrigger>
          <TabsTrigger value="objects">Objets</TabsTrigger>
        </TabsList>

        <TabsContent value="searches" className="mt-6">
          {searches.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Search className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">Aucune recherche trouvée</p>
                <Link href="/dashboard/ai-hub/osint/search">
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Créer votre première recherche
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {searches.map((search: any) => (
                <Card key={search.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-gray-100">
                          <Search className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{search.query}</p>
                          <p className="text-sm text-gray-500">
                            Type: {search.searchType}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={searchStatusColors[search.status] || "outline"}
                      >
                        {search.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="humans" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {humans.map((human: any) => (
              <Card key={human.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <User className="h-8 w-8 text-gray-400" />
                    <div>
                      <p className="font-medium">{human.name || "Inconnu"}</p>
                      <p className="text-sm text-gray-500">
                        {human.profession || "N/A"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="buildings" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {buildings.map((building: any) => (
              <Card key={building.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-8 w-8 text-gray-400" />
                    <div>
                      <p className="font-medium">
                        {building.name || "Inconnu"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {building.city || "N/A"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="objects" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {objects.map((obj: any) => (
              <Card key={obj.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Box className="h-8 w-8 text-gray-400" />
                    <div>
                      <p className="font-medium">{obj.name || "Inconnu"}</p>
                      <p className="text-sm text-gray-500">
                        {obj.category || "N/A"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
