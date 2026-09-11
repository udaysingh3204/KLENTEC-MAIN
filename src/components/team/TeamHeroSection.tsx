import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface TeamHeroProps {
  title: string;
  subtitle: string;
  description: string;
  stats?: { label: string; value: string }[];
  ctaLabel?: string;
  ctaHref?: string;
  showCta?: boolean;
}

const TeamHeroSection = ({
  title,
  subtitle,
  description,
  stats = [],
  ctaLabel = "Join Our Team",
  ctaHref = "/careers",
  showCta = true,
}: TeamHeroProps) => {
  return (
    <section className="relative gradient-bg-hero pt-32 pb-16">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-dreamy mb-6 inline-block">{subtitle}</span>

          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-balance">
            {title}
          </h1>

          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          {stats.length > 0 && (
            <motion.div
              className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="card-dreamy p-4">
                  <p className="text-2xl font-display font-bold gradient-text">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          )}

          {showCta && (
            <motion.div
              className="pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Link to={ctaHref} className="btn-dreamy inline-flex items-center gap-2">
                {ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamHeroSection;
