"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";

export type FilterField = {
  name: string;
  label: string;
  type: "text" | "select" | "date";
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
};

interface EntityFiltersProps {
  title?: string;
  fields: FilterField[];
  onFilter: (filters: Record<string, any>) => void;
  onReset: () => void;
  className?: string;
}

export function EntityFilters({
  title = "Filters",
  fields,
  onFilter,
  onReset,
  className,
}: EntityFiltersProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleFilterChange = (name: string, value: any) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleReset = () => {
    setFilters({});
    onReset();
  };

  const hasActiveFilters = Object.values(filters).some(value =>
    value !== "" && value !== null && value !== undefined
  );

  return (
    <Card className={className}>
      <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <CardTitle className="text-lg">{title}</CardTitle>
            {hasActiveFilters && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {Object.values(filters).filter(v => v !== "" && v !== null && v !== undefined).length} active
              </span>
            )}
          </div>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </CardHeader>

      {isOpen && (
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>{field.label}</Label>
                {field.type === "select" ? (
                  <Select
                    value={filters[field.name] || ""}
                    onValueChange={(value) => handleFilterChange(field.name, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All</SelectItem>
                      {field.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : field.type === "date" ? (
                  <Input
                    id={field.name}
                    type="date"
                    value={filters[field.name] || ""}
                    onChange={(e) => handleFilterChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                  />
                ) : (
                  <Input
                    id={field.name}
                    type="text"
                    value={filters[field.name] || ""}
                    onChange={(e) => handleFilterChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-4 border-t">
            {hasActiveFilters && (
              <Button variant="outline" onClick={handleReset} className="flex items-center gap-2">
                <X className="h-4 w-4" />
                Reset Filters
              </Button>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
