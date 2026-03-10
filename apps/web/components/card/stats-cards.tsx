"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCard {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
    positive: boolean;
  };
}

interface StatsCardsProps {
  stats: StatCard[];
  className?: string;
}

export function StatsCards({ stats, className }: StatsCardsProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className || ""}`}>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon && <stat.icon className="h-4 w-4 text-muted-foreground" />}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.description && (
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            )}
            {stat.trend && (
              <div className={`text-xs ${stat.trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend.positive ? '+' : ''}{stat.trend.value}% {stat.trend.label}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
