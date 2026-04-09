import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroAbstract from "@/assets/hero-abstract.jpg";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center gradient-bg-hero overflow-hidden">
    {/* Floating background elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-primary/[0.03] blur-3xl animate-drift" />
      <div className="absolute bottom-20 left-[15%] w-96 h-96 rounded-full bg-primary/[0.02] blur-3xl animate-drift" style={{ animationDelay: "-3s" }} />
      <div className="absolute top-1/3 left-[60%] w-48 h-48 rounded-full bg-accent/30 blur-3xl animate-float" />
    </div>

    <div className="container mx-auto px-6 pt-36 pb-24 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left content */}
        <div className="text-left">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="badge-dreamy mb-8 inline-flex">
              Digital Growth Partner
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.05]"
          >
            Big Dreams,{" "}
            <span className="gradient-text">Designed to Work.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 text-lg text-muted-foreground max-w-lg leading-relaxed"
          >
            KLENTEC helps brands scale faster with performance marketing, conversion-focused design, and powerful development systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-start gap-4"
          >
            <Link to="/contact" className="btn-dreamy text-base">
              Start a Project
            </Link>
            <Link to="/work" className="btn-ghost text-base">
              View Our Work
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-xs text-muted-foreground tracking-widest uppercase"
          >
            Built for brands that want growth, not just presence.
          </motion.p>
        </div>

        {/* Right — creative image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative hidden lg:block"
        >
          <div className="relative">
            <img
              src={heroAbstract}
              alt="Abstract 3D shapes"
              width={1280}
              height={720}
              className="w-full rounded-3xl"
            />
            {/* Glass overlay stats */}
            <div className="absolute -bottom-6 -left-6 card-glass p-5 animate-float">
              <p className="text-2xl font-display font-bold gradient-text">4.2X</p>
              <p className="text-xs text-muted-foreground mt-1">Avg. ROAS</p>
            </div>
            <div className="absolute -top-4 -right-4 card-glass p-5 animate-float" style={{ animationDelay: "1s" }}>
              <p className="text-2xl font-display font-bold gradient-text">95%</p>
              <p className="text-xs text-muted-foreground mt-1">Client Retention</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats row — mobile */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-20 grid grid-cols-3 gap-4 max-w-2xl lg:hidden"
      >
        {[
          { label: "Avg. ROAS", value: "4.2X" },
          { label: "Projects", value: "150+" },
          { label: "Retention", value: "95%" },
        ].map((stat, i) => (
          <div key={stat.label} className="card-dreamy p-5 text-center animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
            <p className="text-xl font-display font-bold gradient-text">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
