import { motion } from "framer-motion";

interface PriceDisplayProps {
  originalPrice: string;
  newPrice: string;
  label?: string;
  showBadge?: boolean;
  size?: "sm" | "md" | "lg";
}

export const PriceDisplay = ({
  originalPrice,
  newPrice,
  label = "Limited Time Offer",
  showBadge = true,
  size = "md",
}: PriceDisplayProps) => {
  const sizeClasses = {
    sm: {
      new: "text-2xl",
      original: "text-sm",
      badge: "text-xs px-2 py-1",
    },
    md: {
      new: "text-4xl",
      original: "text-lg",
      badge: "text-sm px-3 py-1.5",
    },
    lg: {
      new: "text-5xl",
      original: "text-2xl",
      badge: "text-base px-4 py-2",
    },
  };

  const classes = sizeClasses[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Badge */}
      {showBadge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`${classes.badge} inline-block mb-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold`}
        >
          {label}
        </motion.div>
      )}

      {/* Price Section */}
      <div className="space-y-1">
        {/* Original Price (Struck Through) */}
        <div className={`${classes.original} text-slate-500 line-through font-semibold`}>
          {originalPrice}
        </div>

        {/* New Price (Prominent) */}
        <div className={`${classes.new} font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`}>
          {newPrice}
        </div>
      </div>

      {/* Savings Calculator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-xs text-green-400 font-semibold mt-2"
      >
        ✓ Save up to 25%
      </motion.div>
    </motion.div>
  );
};
