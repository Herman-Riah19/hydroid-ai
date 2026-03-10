"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { Button } from "@repo/ui/components/ui/button";
import { Plus } from "lucide-react";

interface EntityListProps<T> {
  title: string;
  description?: string;
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  emptyMessage?: string;
  emptyAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EntityList<T>({
  title,
  description,
  items,
  renderItem,
  emptyMessage = "Aucun élément trouvé",
  emptyAction,
  className,
}: EntityListProps<T>) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">{emptyMessage}</p>
            {emptyAction && (
              <Button onClick={emptyAction.onClick}>
                <Plus className="mr-2 h-4 w-4" />
                {emptyAction.label}
              </Button>
            )}
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {items.map((item, index) => renderItem(item, index))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
