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
        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition-all text-white text-sm font-medium"
      >
        <Globe size={16} />
        <span>{currentConfig.currency}</span>
        <span className="text-xs text-slate-400">
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
            className="absolute left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden max-h-96"
          >
            <div className="p-3 border-b border-slate-800 bg-slate-800/50">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Select Your Region & Currency
              </p>
            </div>

            <div className="divide-y divide-slate-800">
              {regionOptions.map(({ region, config }) => {
                const isSelected = selectedRegion === region;
                return (
                  <motion.button
                    key={region}
                    whileHover={{ backgroundColor: "rgba(71, 85, 105, 0.5)" }}
                    onClick={() => handleSelect(region)}
                    className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${
                      isSelected
                        ? "bg-purple-600/20 border-l-2 border-purple-600"
                        : "hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">
                        {config.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {config.currency} ({config.symbol})
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {config.timezone} • {config.businessHours.split(" ")[0]}
                      </p>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-2 p-1 bg-purple-600 rounded-full"
                      >
                        <Check size={14} className="text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Footer Info */}
            <div className="p-3 bg-slate-800/30 border-t border-slate-800">
              <p className="text-xs text-slate-500">
                💬 Prices are in {currentConfig.currency}. Support available {currentConfig.businessHours}
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
