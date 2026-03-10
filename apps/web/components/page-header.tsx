"use client";

import { ReactNode } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    icon?: ReactNode;
    onClick: () => void;
  };
  children?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  action,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className || ""}`}>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {description && <p className="text-gray-600">{description}</p>}
        {children}
      </div>

      {action && (
        <Button onClick={action.onClick}>
          {action.icon || <Plus className="mr-2 h-4 w-4" />}
          {action.label}
        </Button>
      )}
    </div>
  );
}
