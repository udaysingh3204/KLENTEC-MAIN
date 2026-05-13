import { cn } from "@/lib/utils";
import { ReactNode } from "react";

/* Aceternity-style moving gradient border wrapper */
const MovingBorder = ({
  children,
  className,
  containerClassName,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) => (
  <div className={cn("relative rounded-3xl p-[1.5px] overflow-hidden", containerClassName)}>
    <span
      className="absolute inset-[-100%] animate-[spin_5s_linear_infinite]"
      style={{
        background:
          "conic-gradient(from 0deg, transparent 0 60%, hsl(var(--primary)) 75%, hsl(var(--purple-glow)) 85%, transparent 100%)",
      }}
    />
    <div className={cn("relative rounded-[calc(1.5rem-1.5px)] bg-card", className)}>{children}</div>
  </div>
);

export default MovingBorder;
