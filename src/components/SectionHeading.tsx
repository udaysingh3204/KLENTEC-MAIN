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
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
    className={`mb-16 ${center ? "text-center" : ""}`}
  >
    {badge && (
      <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
        {badge}
      </span>
    )}
    <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-foreground">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
    )}
    {children}
  </motion.div>
);

export default SectionHeading;
