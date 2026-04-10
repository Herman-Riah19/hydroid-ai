"use client";

import { cn } from "../../lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
  onClick,
}: FeatureCardProps) {
  const Wrapper = onClick ? "button" : "div";

  return (
    <Wrapper
      onClick={onClick}
      className={cn(
        "bg-gray-900 border border-gray-800 hover:border-gray-700 hover:bg-gray-850 transition-all group text-left w-full",
        onClick && "cursor-pointer hover:scale-[1.02]",
        className,
      )}
    >
      <div className="p-6">
        <div
          className={cn(
            "w-14 h-14 rounded-xl bg-gray-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
          )}
        >
          <Icon className="h-7 w-7 text-gray-300" />
        </div>
        <h3 className="text-xl font-semibold text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </Wrapper>
  );
}

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  className?: string;
}

export function StatCard({
  icon: Icon,
  value,
  label,
  className,
}: StatCardProps) {
  return (
    <div className={cn("text-center", className)}>
      <Icon className="h-8 w-8 mx-auto text-gray-400 mb-3" />
      <div className="text-3xl font-bold text-gray-100 mb-1">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  isLast?: boolean;
}

export function StepCard({
  number,
  title,
  description,
  isLast,
}: StepCardProps) {
  return (
    <div className="relative">
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 text-center">
        <div className="text-5xl font-bold text-gray-700 mb-4">{number}</div>
        <h3 className="text-xl font-semibold text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
      {!isLast && (
        <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );
}

interface ModelCardProps {
  name: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function ModelCard({ name, isActive, onClick }: ModelCardProps) {
  const Wrapper = onClick ? "button" : "div";

  return (
    <Wrapper
      onClick={onClick}
      className={cn(
        "flex items-center justify-between p-3 rounded-lg bg-gray-800/50",
        onClick && "cursor-pointer hover:bg-gray-800 transition-colors",
      )}
    >
      <span className="font-mono text-sm">{name}</span>
      {isActive && (
        <span className="text-xs border border-cyan-500/50 text-cyan-400 px-2 py-1 rounded">
          Actif
        </span>
      )}
    </Wrapper>
  );
}

interface SearchResultCardProps {
  title: string;
  subtitle?: string;
  confidence?: number;
  status?: "completed" | "pending" | "failed";
  onClick?: () => void;
}

export function SearchResultCard({
  title,
  subtitle,
  confidence,
  status = "pending",
  onClick,
}: SearchResultCardProps) {
  const statusColors = {
    completed: "text-green-400",
    pending: "text-yellow-400",
    failed: "text-red-400",
  };

  const Wrapper = onClick ? "button" : "div";

  return (
    <Wrapper
      onClick={onClick}
      className={cn(
        "p-4 rounded-lg bg-gray-900/50 border border-gray-800 text-left w-full",
        onClick && "cursor-pointer hover:border-gray-700 transition-colors",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white truncate">{title}</h4>
          {subtitle && (
            <p className="text-sm text-gray-400 truncate">{subtitle}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1">
          {confidence !== undefined && (
            <span className="text-sm text-gray-400">
              {Math.round(confidence * 100)}%
            </span>
          )}
          <span className={cn("text-xs capitalize", statusColors[status])}>
            {status}
          </span>
        </div>
      </div>
    </Wrapper>
  );
}

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color?: string;
}

export function ActionCard({
  title,
  description,
  icon: Icon,
  href,
}: ActionCardProps) {
  return (
    <a
      href={href}
      className="block p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 hover:bg-gray-850 hover:scale-[1.02] transition-all group"
    >
      <div
        className={cn(
          "w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
        )}
      >
        <Icon className="h-6 w-6 text-gray-300" />
      </div>
      <h3 className="text-lg font-semibold text-gray-100 mb-1">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </a>
  );
}
