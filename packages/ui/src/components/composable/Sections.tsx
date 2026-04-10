"use client";

import { LucideIcon } from "lucide-react";
import {
  FeatureCard,
  StatCard,
  StepCard,
  ModelCard,
  SearchResultCard,
  ActionCard,
} from "../card/index";

export {
  FeatureCard,
  StatCard,
  StepCard,
  ModelCard,
  SearchResultCard,
  ActionCard,
};

export interface SectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export interface FeatureSectionProps extends SectionProps {
  features: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
    color?: string;
    onClick?: () => void;
  }>;
}

export interface StatSectionProps extends SectionProps {
  stats: Array<{
    icon: LucideIcon;
    value: string;
    label: string;
  }>;
}

export interface StepsSectionProps extends SectionProps {
  steps: Array<{
    number: string;
    title: string;
    description: string;
  }>;
}

export function FeatureSection({
  title,
  subtitle,
  features,
  className,
}: FeatureSectionProps) {
  return (
    <section className={className}>
      {(title || subtitle) && (
        <div className="text-center mb-16">
          {title && (
            <h2 className="text-4xl font-bold mb-4 text-gray-100">{title}</h2>
          )}
          {subtitle && (
            <p className="text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, i) => (
          <FeatureCard key={i} {...feature} />
        ))}
      </div>
    </section>
  );
}

export function StatSection({ stats, className }: StatSectionProps) {
  return (
    <section className={className}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
    </section>
  );
}

export function StepsSection({
  title,
  subtitle,
  steps,
  className,
}: StepsSectionProps) {
  return (
    <section className={className}>
      {(title || subtitle) && (
        <div className="text-center mb-16">
          {title && (
            <h2 className="text-4xl font-bold mb-4 text-gray-100">{title}</h2>
          )}
          {subtitle && <p className="text-gray-400">{subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <StepCard key={i} {...step} isLast={i === steps.length - 1} />
        ))}
      </div>
    </section>
  );
}

export interface ActionGridProps extends SectionProps {
  actions: Array<{
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    color?: string;
  }>;
}

export function ActionGrid({
  title,
  subtitle,
  actions,
  className,
}: ActionGridProps) {
  return (
    <section className={className}>
      {(title || subtitle) && (
        <div className="mb-8">
          {title && (
            <h2 className="text-3xl font-bold mb-2 text-gray-100">{title}</h2>
          )}
          {subtitle && <p className="text-gray-400">{subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, i) => (
          <ActionCard key={i} {...action} />
        ))}
      </div>
    </section>
  );
}
