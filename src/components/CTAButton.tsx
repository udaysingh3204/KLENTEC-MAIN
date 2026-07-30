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

  const baseClass = `flex items-center gap-2 ${className}`;

  const variantClass = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white font-semibold",
    outline: "border border-slate-600 text-slate-300 hover:border-purple-500 hover:text-purple-400",
  };

  return (
    <Button
      onClick={handleClick}
      className={`${baseClass} ${variantClass[variant]}`}
    >
      {label}
      {icon && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
    </Button>
  );
};
