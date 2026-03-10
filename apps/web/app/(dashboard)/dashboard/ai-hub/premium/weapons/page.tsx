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
import { Shield, Plus, Trash2, Loader2, Crown } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { WeaponServices } from "@/services/weaponServices";

const weaponCategoryLabels: Record<string, string> = {
  HANDGUN: "Pistolet",
  RIFLE: "Fusil",
  SHOTGUN: "Fusil à pompe",
  SUBMACHINE_GUN: "SMG",
  ASSAULT_RIFLE: "Fusil d'assaut",
  SNIPER_RIFLE: "Fusil de sniper",
  MACHINE_GUN: "Mitrailleuse",
  GRENADE_LAUNCHER: "Lance-grenade",
  MISSILE: "Missile",
  EXPLOSIVE: "Explosif",
  MELEE: "Arme blanche",
  OTHER: "Autre",
};

export default function PremiumWeaponsPage() {
  const { token } = useAuthStore();
  const [weapons, setWeapons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");

  useEffect(() => {
    if (token) {
      loadWeapons();
    }
  }, [token]);

  const loadWeapons = async () => {
    try {
      const data = await WeaponServices.getAllWeapons(token!);
      setWeapons(data);
    } catch (error) {
      console.error("Error loading weapons:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (weaponId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette arme?")) return;
    try {
      await WeaponServices.deleteWeapon(weaponId, token!);
      loadWeapons();
    } catch (error) {
      console.error("Error deleting weapon:", error);
    }
  };

  const filteredWeapons =
    filter === "ALL"
      ? weapons
      : filter === "PREMIUM"
        ? weapons.filter((w: any) => w.isPremium)
        : weapons.filter((w: any) => w.category === filter);

  const categories = [...new Set(weapons.map((w: any) => w.category))];

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
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Crown className="h-6 w-6 text-yellow-500" />
              Premium
            </h1>
            <p className="text-gray-600">
              Base de données armes - Informations éducatives
            </p>
          </div>
        </div>
        <Link href="/dashboard/ai-hub/premium/weapons/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une arme
          </Button>
        </Link>
      </div>

      <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-yellow-100">
              <Shield className="h-8 w-8 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-yellow-800">Section Premium</h3>
              <p className="text-sm text-yellow-700">
                Cette section contient des informations éducatives sur les
                armes. L'utilisation de ces informations doit être conforme aux
                lois en vigueur.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total armes</p>
                <p className="text-2xl font-bold">{weapons.length}</p>
              </div>
              <Shield className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Catégories</p>
                <p className="text-2xl font-bold">{categories.length}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Armes premium
                </p>
                <p className="text-2xl font-bold">
                  {weapons.filter((w: any) => w.isPremium).length}
                </p>
              </div>
              <Crown className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ALL" onValueChange={setFilter}>
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="ALL">Tous</TabsTrigger>
          <TabsTrigger value="PREMIUM">Premium</TabsTrigger>
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {weaponCategoryLabels[cat] || cat}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          {filteredWeapons.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Shield className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">Aucune arme trouvée</p>
                <Link href="/dashboard/ai-hub/premium/weapons/new">
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter votre première arme
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWeapons.map((weapon: any) => (
                <Card
                  key={weapon.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{weapon.name}</CardTitle>
                        <CardDescription>
                          {weaponCategoryLabels[weapon.category] ||
                            weapon.category}
                        </CardDescription>
                      </div>
                      {weapon.isPremium && (
                        <Badge
                          variant="secondary"
                          className="bg-yellow-100 text-yellow-800"
                        >
                          <Crown className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {weapon.manufacturer && (
                      <p className="text-sm text-gray-600 mb-2">
                        Fabricant: {weapon.manufacturer}
                      </p>
                    )}
                    {weapon.caliber && (
                      <p className="text-sm text-gray-600 mb-2">
                        Calibre: {weapon.caliber}
                      </p>
                    )}
                    {weapon.description && (
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                        {weapon.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/ai-hub/premium/weapons/${weapon.id}`}
                      >
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(weapon.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
