"use client";

import { ReactNode } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";

interface EntityCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  status?: {
    label: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
  metadata?: Array<{
    label: string;
    value: string;
  }>;
  actions?: Array<{
    icon: ReactNode;
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "destructive";
  }>;
  className?: string;
  children?: ReactNode;
}

export function EntityCard({
  title,
  subtitle,
  description,
  status,
  metadata = [],
  actions = [],
  className,
  children,
}: EntityCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-3 flex flex-row items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            {status && (
              <Badge variant={status.variant || "outline"}>
                {status.label}
              </Badge>
            )}
          </div>
          {subtitle && (
            <div className="text-sm font-medium text-gray-700 leading-tight mb-1">{subtitle}</div>
          )}
          {metadata.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-1">
              {metadata.map((item, index) => (
                <Badge key={index} variant="secondary" className="text-xs font-normal px-2 py-1">
                  <span className="font-medium">{item.label}:</span> {item.value}
                </Badge>
              ))}
            </div>
          )}
          {description && (
            <CardDescription className="text-gray-600 mb-1">{description}</CardDescription>
          )}
        </div>
        {actions.length > 0 && (
          <div className="flex gap-2 items-start flex-shrink-0">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "outline"}
                size="sm"
                onClick={action.onClick}
                title={action.label}
              >
                {action.icon}
              </Button>
            ))}
          </div>
        )}
      </CardHeader>
      {(children) && (
        <CardContent className="pt-0">{children}</CardContent>
      )}
    </Card>
  );
}
