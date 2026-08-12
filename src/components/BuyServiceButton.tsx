import { useNavigate } from "react-router-dom";
import { useRegionalPrice } from "@/hooks/useRegionalPrice";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface BuyServiceButtonProps {
  serviceId: string;
  serviceName: string;
  amount: number;
  label?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export const BuyServiceButton = ({
  serviceId,
  serviceName,
  amount,
  label = "Buy Now",
  variant = "primary",
  className = "",
}: BuyServiceButtonProps) => {
  const navigate = useNavigate();
  const { formatPrice } = useRegionalPrice();

  const handleClick = () => {
    const params = new URLSearchParams({
      serviceId,
      serviceName,
      amount: amount.toString(),
    });
    navigate(`/checkout?${params.toString()}`);
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-br from-[hsl(var(--purple-mid))] to-[hsl(var(--purple-dark))] hover:brightness-110 text-primary-foreground",
    secondary: "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
    outline: "border border-border/60 bg-transparent text-muted-foreground hover:border-primary/40 hover:text-primary",
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-2xl transition-all",
        variantClasses[variant],
        className,
      )}
    >
      <ShoppingCart size={18} />
      <span>{label}</span>
    </button>
  );
};
