import React, { createContext, useContext, useState, useEffect } from "react";
import { Region, AVAILABLE_REGIONS, getDefaultRegion } from "@/config/regionalConfig";

interface RegionalContextType {
  selectedRegion: Region;
  setSelectedRegion: (region: Region) => void;
  isLoading: boolean;
}

const RegionalContext = createContext<RegionalContextType | undefined>(undefined);

export const RegionalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<Region>(getDefaultRegion());
  const [isLoading, setIsLoading] = useState(true);

  // Load saved region from localStorage on mount
  useEffect(() => {
    const savedRegion = localStorage.getItem("selectedRegion") as Region | null;
    if (savedRegion && AVAILABLE_REGIONS.includes(savedRegion)) {
      setSelectedRegion(savedRegion);
    }
    setIsLoading(false);
  }, []);

  // Save selected region to localStorage
  const handleSetRegion = (region: Region) => {
    setSelectedRegion(region);
    localStorage.setItem("selectedRegion", region);

    // Optionally: Reload page to refresh all prices
    // window.location.reload();
  };

  return (
    <RegionalContext.Provider
      value={{
        selectedRegion,
        setSelectedRegion: handleSetRegion,
        isLoading,
      }}
    >
      {children}
    </RegionalContext.Provider>
  );
};

/**
 * Hook to use regional context
 */
export const useRegional = (): RegionalContextType => {
  const context = useContext(RegionalContext);
  if (!context) {
    throw new Error("useRegional must be used within RegionalProvider");
  }
  return context;
};
