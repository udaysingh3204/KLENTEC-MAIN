import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Users, Award } from "lucide-react";
import { motion } from "framer-motion";
import GridBackground from "@/components/effects/GridBackground";

const stats = [
  { icon: TrendingUp, value: "4.2x", label: "Avg. ROAS delivered", rotate: "-rotate-2" },
  { icon: Users, value: "150+", label: "Brands scaled", rotate: "rotate-1" },
  { icon: Award, value: "10+ yrs", label: "Industry experience", rotate: "-rotate-1" },
];

const EnterpriseHeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative overflow-hidden bg-background pt-40 pb-20 sm:pt-48 sm:pb-28">
      <GridBackground />
      {/* Large asymmetric glow standing in for a hero photo */}
      <div
        className="absolute top-0 right-0 w-[55%] h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 80% 30%, hsl(var(--purple-mid) / 0.25), transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.span
              variants={itemVariants}
              className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-primary"
            >
              Enterprise Growth Solutions
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-sans font-extrabold tracking-tight leading-[1.05] text-foreground"
            >
              Transform Your{" "}
              <span className="gradient-text">Digital Presence</span> Into
              Revenue
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              Join 150+ brands that grew revenue 4.2x through our strategic
              digital solutions — from brand strategy to full-stack
              development.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <Link to="/contact" className="btn-dreamy inline-flex items-center justify-center gap-2">
                Book Free Strategy Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                Get a Free Growth Audit
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            {/* Compact stat row — mobile / no room for the floating cards */}
            <motion.div
              variants={itemVariants}
              className="mt-12 grid grid-cols-3 gap-3 max-w-md lg:hidden"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="card-dreamy p-4">
                  <p className="text-xl font-display font-bold gradient-text">{stat.value}</p>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — floating proof cards standing in for a hero photo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[420px] hidden lg:block"
          >
            <div
              className="absolute inset-0 rounded-full blur-[100px]"
              style={{ background: "hsl(var(--purple-mid) / 0.18)" }}
            />

            {stats.map((stat, i) => {
              const Icon = stat.icon;
              const positions = [
                "top-4 left-4",
                "top-1/2 -translate-y-1/2 right-0",
                "bottom-4 left-16",
              ];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                  className={`absolute ${positions[i]} card-dreamy p-6 w-56 ${stat.rotate}`}
                >
                  <div className="icon-dreamy mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-display font-bold gradient-text">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseHeroSection;
