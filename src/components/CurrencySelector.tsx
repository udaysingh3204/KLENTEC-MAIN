import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { useRegional } from "@/contexts/RegionalContext";
import { Region, AVAILABLE_REGIONS, regionalConfigs } from "@/config/regionalConfig";

export const CurrencySelector = () => {
  const { selectedRegion, setSelectedRegion } = useRegional();
  const [isOpen, setIsOpen] = useState(false);

  const regionOptions = AVAILABLE_REGIONS.map((region) => ({
    region,
    config: regionalConfigs[region],
  }));

  const currentConfig = regionalConfigs[selectedRegion];

  const handleSelect = (region: Region) => {
    setSelectedRegion(region);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Selector Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-card hover:bg-muted border border-border transition-all text-foreground text-sm font-medium"
      >
        <Globe size={16} />
        <span>{currentConfig.currency}</span>
        <span className="text-xs text-muted-foreground">
          {currentConfig.symbol}
        </span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-2 card-dreamy overflow-hidden max-h-96 p-0 z-50"
          >
            <div className="p-3 border-b border-border bg-muted/50">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Select Your Region & Currency
              </p>
            </div>

            <div className="divide-y divide-border">
              {regionOptions.map(({ region, config }) => {
                const isSelected = selectedRegion === region;
                return (
                  <motion.button
                    key={region}
                    onClick={() => handleSelect(region)}
                    className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${
                      isSelected
                        ? "bg-primary/10 border-l-2 border-primary"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">
                        {config.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {config.currency} ({config.symbol})
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        {config.timezone} • {config.businessHours.split(" ")[0]}
                      </p>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-2 p-1 bg-primary rounded-full"
                      >
                        <Check size={14} className="text-primary-foreground" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Footer Info */}
            <div className="p-3 bg-muted/30 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Prices are in {currentConfig.currency}. Support available {currentConfig.businessHours}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close on outside click */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
