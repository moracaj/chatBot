import React from "react";
import { cn } from "../utils/cn";

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-6 bg-secondary/50 border border-border/50 transition-all hover:bg-secondary/80 hover:shadow-md",
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}