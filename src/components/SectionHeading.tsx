import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children?: ReactNode;
  center?: boolean;
}

const SectionHeading = ({ title, subtitle, badge, children, center = true }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5 }}
    className={`mb-14 ${center ? "text-center" : ""}`}
  >
    {badge && (
      <span className="badge-pill mb-5 inline-block">{badge}</span>
    )}
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
    )}
    {children}
  </motion.div>
);

export default SectionHeading;
