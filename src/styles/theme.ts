/**
 * KLENTEC ENTERPRISE DESIGN SYSTEM
 * Professional Dark Theme - Unified Across All Pages
 */

export const KLENTEC_THEME = {
  // Primary Colors
  colors: {
    primary: {
      purple: "from-purple-600 to-purple-500",
      pink: "to-pink-600",
      gradient: "from-purple-600 via-pink-500 to-purple-600",
    },
    backgrounds: {
      primary: "bg-slate-950",      // Darkest - Page background
      secondary: "bg-slate-900",    // Dark - Sections
      tertiary: "bg-slate-800",     // Medium - Cards
      hover: "hover:bg-slate-700",  // Hover states
    },
    text: {
      primary: "text-white",
      secondary: "text-slate-300",
      tertiary: "text-slate-400",
      muted: "text-slate-500",
    },
    borders: {
      primary: "border-slate-800",
      secondary: "border-slate-700",
      hover: "hover:border-slate-600",
    },
    accents: {
      blue: "from-blue-500 to-cyan-500",
      green: "from-green-500 to-emerald-500",
      orange: "from-orange-500 to-red-500",
      indigo: "from-indigo-500 to-purple-500",
    },
  },

  // Section Backgrounds (Dark theme - consistent across all pages)
  sections: {
    hero: "bg-gradient-to-br from-slate-950 to-slate-900",
    content: "bg-slate-950",
    alternate: "bg-slate-900",
    card: "bg-slate-800 border border-slate-700",
  },

  // Typography (Consistent sizing & weights)
  typography: {
    h1: "text-5xl sm:text-6xl font-bold text-white",
    h2: "text-4xl sm:text-5xl font-bold text-white",
    h3: "text-2xl font-bold text-white",
    h4: "text-xl font-bold text-white",
    subtitle: "text-lg sm:text-xl text-slate-300",
    body: "text-base text-slate-300",
    small: "text-sm text-slate-400",
  },

  // Spacing (Consistent across all sections)
  spacing: {
    section: "py-20",
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    gap: {
      small: "gap-4",
      medium: "gap-6",
      large: "gap-8",
    },
  },

  // Button Styles (Consistent across all CTAs)
  buttons: {
    primary: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white",
    secondary: "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700",
    outline: "border-slate-600 text-slate-300 hover:bg-slate-900",
  },

  // Animation (Consistent motion across site)
  animations: {
    fadeIn: "opacity-0 → opacity-1, 0.5s",
    slideUp: "y: 20 → y: 0, 0.5s",
    hover: "whileHover={{ y: -5 }}",
  },
};

// Service-Specific Color Themes
export const SERVICE_COLORS = {
  digitalMarketing: "from-blue-600 to-cyan-600",
  webDevelopment: "from-indigo-600 to-purple-600",
  designBranding: "from-pink-600 to-rose-600",
  automation: "from-orange-600 to-red-600",
  strategy: "from-emerald-600 to-teal-600",
  managedServices: "from-violet-600 to-purple-600",
  team: "from-purple-600 to-pink-600",
  careers: "from-green-600 to-emerald-600",
};

export default KLENTEC_THEME;
