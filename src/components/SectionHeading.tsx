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
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6 }}
    className={`mb-16 ${center ? "text-center" : ""}`}
  >
    {badge && (
      <span className="badge-dreamy mb-5 inline-block">{badge}</span>
    )}
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground leading-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">{subtitle}</p>
    )}
    {children}
  </motion.div>
);

export default SectionHeading;
