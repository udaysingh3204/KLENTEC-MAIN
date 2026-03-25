import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, ChevronDown } from "lucide-react";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center gradient-bg-hero overflow-hidden">
    <div className="container mx-auto px-6 pt-28 pb-20 text-center relative z-10">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <span className="badge-pill mb-8 inline-flex">
          <Zap className="w-3.5 h-3.5" />
          Digital Growth Partner
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.1] max-w-4xl mx-auto"
      >
        We Don't Build Websites.{" "}
        <span className="gradient-text">We Build Digital Machines.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
      >
        KLENTEC helps brands scale faster with performance marketing, conversion-focused design, and powerful development systems.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <Link to="/contact" className="btn-primary-gradient px-8 py-3.5 text-base">
          Start a Project
        </Link>
        <Link to="/work" className="btn-secondary-clean px-8 py-3.5 text-base">
          View Our Work
        </Link>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-xs text-muted-foreground"
      >
        Built for brands that want growth, not just presence.
      </motion.p>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
      >
        {[
          { label: "Avg. ROAS", value: "4.2X" },
          { label: "Projects Delivered", value: "150+" },
          { label: "Client Retention", value: "95%" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="card-elevated p-6 text-center animate-float"
            style={{ animationDelay: `${i * 0.5}s` }}
          >
            <p className="text-2xl font-display font-bold gradient-text">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </div>

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
      <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce" />
    </div>
  </section>
);

export default HeroSection;
