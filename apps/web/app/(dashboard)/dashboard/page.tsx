import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { Progress } from "@repo/ui/components/ui/progress";
import { Separator } from "@repo/ui/components/ui/separator";
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
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    {
      name: "Vulnérabilités critiques",
      value: "3",
      icon: Shield,
      change: "-12%",
      trend: "up" as const,
    },
    {
      name: "Scans effectués",
      value: "1,892",
      icon: Globe,
      change: "+28%",
      trend: "up" as const,
    },
    {
      name: "Analyses IA",
      value: "56",
      icon: Brain,
      change: "+8%",
      trend: "up" as const,
    },
    {
      name: "Sites sécurisés",
      value: "134",
      icon: Shield,
      change: "+45%",
      trend: "up" as const,
    },
  ];

  const actions = [
    {
      name: "Security Scanner",
      description: "Scannez les vulnérabilités web",
      href: "/dashboard/ai-hub/security",
      icon: Shield,
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
      type: "security",
      name: "Scan: example.com",
      status: "completed",
      time: "Il y a 2 min",
    },
    {
      type: "security",
      name: "SQLi Test: api.example.com",
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
    { name: "Security Scanner", status: "active", tasks: 12, cpu: 45 },
    { name: "SQLi Tester", status: "active", tasks: 8, cpu: 72 },
    { name: "XSS Detector", status: "idle", tasks: 0, cpu: 12 },
  ];

  const systemMetrics = [
    { label: "Scans aujourd'hui", value: "14", icon: Shield },
    { label: "Tâches actives", value: "3", icon: Zap },
    { label: "Précision IA", value: "89%", icon: Target },
    { label: "Uptime", value: "99.9%", icon: Clock },
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Tableau de bord
            </h1>
            <p className="text-sm text-muted-foreground">
              Plateforme de sécurité applicative
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1.5 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              Ollama
            </Badge>
            <Badge variant="outline" className="gap-1.5 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
              LM Studio
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Badge variant="secondary" className="text-xs gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold tracking-tight text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {stat.name}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">
          Actions rapides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.name} href={action.href}>
                <Card className="group cursor-pointer transition-colors hover:bg-accent/40">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted transition-transform group-hover:scale-105">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground flex items-center gap-1">
                        {action.name}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {action.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Two-column: Activity + Agents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                Activité récente
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-xs h-7">
                Voir tout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {recentActivity.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-md px-3 py-2.5 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2 w-2 rounded-full shrink-0 ${
                        activity.status === "completed"
                          ? "bg-foreground/40"
                          : activity.status === "running"
                            ? "bg-foreground/60 animate-pulse"
                            : "bg-muted-foreground/40"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {activity.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
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
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Cpu className="h-4 w-4 text-muted-foreground" />
              Agents IA
            </CardTitle>
            <CardDescription>
              {activeAgents.filter((a) => a.status === "active").length} agents
              actifs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeAgents.map((agent, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
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
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {agent.cpu}%
                  </span>
                </div>
              </div>
            ))}
            <Separator />
            <Button variant="outline" size="sm" className="w-full">
              Gérer les agents
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            Status système
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {systemMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="flex flex-col items-center rounded-lg border bg-muted/30 p-4 text-center"
                >
                  <Icon className="h-4 w-4 text-muted-foreground mb-2" />
                  <p className="text-lg font-bold tabular-nums text-foreground">
                    {metric.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
