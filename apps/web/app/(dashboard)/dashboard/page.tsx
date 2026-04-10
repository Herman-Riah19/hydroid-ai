import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { Progress } from "@repo/ui/components/ui/progress";
import {
  Search,
  Globe,
  Brain,
  Image as ImageIcon,
  Shield,
  Activity,
  Zap,
  Target,
  Database,
  Cpu,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    {
      name: "Recherches OSINT",
      value: "247",
      icon: Search,
      change: "+12%",
    },
    {
      name: "Scrappings",
      value: "1,892",
      icon: Globe,
      change: "+28%",
    },
    {
      name: "Analyses IA",
      value: "56",
      icon: Brain,
      change: "+8%",
    },
    {
      name: "Images générées",
      value: "134",
      icon: ImageIcon,
      change: "+45%",
    },
  ];

  const actions = [
    {
      name: "Nouvelle Recherche",
      description: "Lancez une recherche OSINT",
      href: "/dashboard/actions/osint",
      icon: Search,
    },
    {
      name: "Web Scraping",
      description: "Collectez des données du web",
      href: "/dashboard/actions/scraping",
      icon: Globe,
    },
    {
      name: "Analyse IA",
      description: "Analysez vos données",
      href: "/dashboard/actions/analyze",
      icon: Brain,
    },
    {
      name: "Génération Image",
      description: "Créez des visuels IA",
      href: "/dashboard/actions/image",
      icon: ImageIcon,
    },
  ];

  const recentActivity = [
    {
      type: "osint",
      name: "Recherche: John Doe",
      status: "completed",
      time: "Il y a 2 min",
    },
    {
      type: "scraping",
      name: "Scrapping: example.com",
      status: "running",
      time: "Il y a 5 min",
    },
    {
      type: "analysis",
      name: "Analyse de profil",
      status: "pending",
      time: "Il y a 12 min",
    },
    {
      type: "image",
      name: "Génération: Portrait",
      status: "completed",
      time: "Il y a 18 min",
    },
  ];

  const activeAgents = [
    { name: "OSINT Scanner", status: "active", tasks: 12, cpu: 45 },
    { name: "Web Crawler", status: "active", tasks: 8, cpu: 72 },
    { name: "Image Generator", status: "idle", tasks: 0, cpu: 12 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">
            Hydroid Command Center
          </h1>
          <p className="text-gray-500 mt-1">
            Plateforme de renseignement et analyse intelligence
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Ollama Connecté
          </Badge>
          <Badge variant="outline" className="gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-500"></span>
            LM Studio Ready
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-gray-800">
                    <Icon className="h-5 w-5 text-gray-300" />
                  </div>
                  <span className="text-xs font-medium text-gray-400">
                    {stat.change}
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold text-gray-100">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">{stat.name}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions - Main Feature */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.name} href={action.href}>
              <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all cursor-pointer group">
                <CardContent className="p-5">
                  <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-gray-300" />
                  </div>
                  <h3 className="font-semibold text-gray-100 group-hover:text-gray-300 transition-colors">
                    {action.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-gray-100 flex items-center gap-2">
                <Activity className="h-5 w-5 text-gray-400" />
                Activité Récente
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-100"
              >
                Voir tout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-800 hover:bg-gray-750 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.status === "completed"
                          ? "bg-gray-400"
                          : activity.status === "running"
                            ? "bg-gray-500 animate-pulse"
                            : "bg-gray-600"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-100">
                        {activity.name}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs capitalize">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Agents */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-gray-100 flex items-center gap-2">
              <Cpu className="h-5 w-5 text-gray-400" />
              Agents IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeAgents.map((agent, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-100">
                    {agent.name}
                  </span>
                  <Badge
                    variant={
                      agent.status === "active" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {agent.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={agent.cpu} className="flex-1 h-1.5" />
                  <span className="text-xs text-gray-500">{agent.cpu}%</span>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full mt-4 border-gray-700 hover:bg-gray-800"
            >
              Gérer les agents
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-gray-100 flex items-center gap-2">
            <Shield className="h-5 w-5 text-gray-400" />
            Status Système
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-gray-800 text-center">
              <Database className="h-5 w-5 mx-auto text-gray-400 mb-2" />
              <p className="text-lg font-bold text-gray-100">14.2 GB</p>
              <p className="text-xs text-gray-500">Données OSINT</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-800 text-center">
              <Zap className="h-5 w-5 mx-auto text-gray-400 mb-2" />
              <p className="text-lg font-bold text-gray-100">3</p>
              <p className="text-xs text-gray-500">Tâches actives</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-800 text-center">
              <Target className="h-5 w-5 mx-auto text-gray-400 mb-2" />
              <p className="text-lg font-bold text-gray-100">89%</p>
              <p className="text-xs text-gray-500">Précision IA</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-800 text-center">
              <Clock className="h-5 w-5 mx-auto text-gray-400 mb-2" />
              <p className="text-lg font-bold text-gray-100">99.9%</p>
              <p className="text-xs text-gray-500">Uptime</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
