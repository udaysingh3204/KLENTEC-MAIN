import { cn } from "@/lib/utils";

/* Aceternity-style dotted grid with radial mask */
const GridBackground = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "absolute inset-0 pointer-events-none",
      "[background-image:radial-gradient(hsl(var(--primary)/0.18)_1px,transparent_1px)]",
      "[background-size:22px_22px]",
      "[mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]",
      className,
    )}
  />
);

export default GridBackground;
