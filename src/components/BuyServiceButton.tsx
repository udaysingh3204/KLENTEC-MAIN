import { useNavigate } from "react-router-dom";
import { useRegionalPrice } from "@/hooks/useRegionalPrice";
import { ShoppingCart } from "lucide-react";

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
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white",
    outline: "border border-slate-600 text-slate-300 hover:border-purple-500 hover:text-purple-400",
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-lg transition-all ${variantClasses[variant]} ${className}`}
    >
      <ShoppingCart size={18} />
      <span>{label}</span>
    </button>
  );
};
