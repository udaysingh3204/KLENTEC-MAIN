import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Spotlight from "@/components/effects/Spotlight";
import GridBackground from "@/components/effects/GridBackground";
import MovingBorder from "@/components/effects/MovingBorder";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
    <GridBackground />
    <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="hsl(var(--primary))" />

    <div className="container mx-auto px-6 pt-36 pb-24 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block"
        >
          <MovingBorder containerClassName="rounded-full">
            <span className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-primary">
              <Sparkles className="w-3.5 h-3.5" />
              Digital Growth Partner
            </span>
          </MovingBorder>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight leading-[1.02]"
        >
          Big Dreams, <br className="hidden sm:block" />
          <span className="gradient-text">Designed to Work.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          KLENTEC helps brands scale faster with performance marketing,
          conversion-focused design, and powerful development systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/contact" className="btn-dreamy text-base inline-flex items-center gap-2">
            Start a Project <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/work" className="btn-ghost text-base">
            View Our Work
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto"
        >
          {[
            { label: "Avg. ROAS", value: "4.2X" },
            { label: "Projects", value: "150+" },
            { label: "Retention", value: "95%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="card-dreamy p-5 md:p-7 text-center"
            >
              <p className="text-2xl md:text-4xl font-display font-bold gradient-text">{stat.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-2 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
