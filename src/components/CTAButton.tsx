import { handleCTA, CTAType } from "@/services/ctaService";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

interface CTAButtonProps {
  type: CTAType;
  label: string;
  source: string;
  variant?: "primary" | "secondary" | "outline";
  icon?: boolean;
  className?: string;
}

export const CTAButton = ({
  type,
  label,
  source,
  variant = "primary",
  icon = true,
  className = "",
}: CTAButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleCTA(type, source);
  };

  const variantClass = {
    primary:
      "h-auto rounded-2xl px-8 py-4 font-semibold text-primary-foreground bg-gradient-to-br from-[hsl(var(--purple-mid))] to-[hsl(var(--purple-dark))] hover:brightness-110 shadow-[0_4px_20px_hsl(260_65%_55%/0.25)]",
    secondary: "h-auto rounded-2xl px-8 py-4 font-semibold bg-secondary hover:bg-secondary/80 text-secondary-foreground",
    outline: "h-auto rounded-2xl px-8 py-4 font-semibold border border-border/60 bg-transparent text-muted-foreground hover:border-primary/40 hover:text-primary",
  };

  // Variant classes first, custom `className` last so caller overrides win the twMerge conflict resolution.
  const finalClass = `flex items-center gap-2 ${variantClass[variant]} ${className}`;

  return (
    <Button
      onClick={handleClick}
      className={finalClass}
    >
      {label}
      {icon && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
    </Button>
  );
};
