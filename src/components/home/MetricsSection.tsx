import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const metrics = [
  { value: 42, suffix: "X", divisor: 10, label: "Avg ROAS in 90 Days" },
  { value: 320, suffix: "%", divisor: 1, label: "Avg Lead Growth" },
  { value: 150, suffix: "+", divisor: 1, label: "Successful Projects" },
  { value: 95, suffix: "%", divisor: 1, label: "Client Retention Rate" },
];

function Counter({ value, suffix, divisor }: { value: number; suffix: string; divisor: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const duration = 1500;
          const startTime = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, started]);

  const displayCount = divisor > 1 ? (count / divisor).toFixed(1) : count;

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-display font-extrabold gradient-text">
        {displayCount}{suffix}
      </p>
    </div>
  );
}

const MetricsSection = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="badge-dreamy mb-5 inline-block">Proven Results</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground">
          Results That Matter
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">These aren't promises. These are averages from our last 50 client engagements.</p>
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card-dreamy p-8"
          >
            <Counter value={m.value} suffix={m.suffix} divisor={m.divisor} />
            <p className="text-sm text-muted-foreground mt-4 text-center">{m.label}</p>
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center mt-10 text-sm text-muted-foreground"
      >
        We don't guess. <span className="font-semibold text-foreground">We measure.</span>
      </motion.p>
    </div>
  </section>
);

export default MetricsSection;
