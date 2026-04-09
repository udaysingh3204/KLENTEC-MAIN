import { motion } from "framer-motion";
import { Star } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const testimonials = [
  { quote: "KLENTEC completely transformed our business. The results were insane.", name: "Arjun Patel", role: "Founder, E-commerce Brand" },
  { quote: "We finally found a team that understands growth, not just marketing.", name: "Priya Sharma", role: "CEO, EdTech Startup" },
  { quote: "Their systems changed how we scale. Highly recommended.", name: "Rahul Mehta", role: "Director, Real Estate Firm" },
];

const TestimonialsSection = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <SectionHeading badge="Testimonials" title="What Our Clients Say" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card-dreamy p-8"
          >
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground text-sm leading-relaxed">"{t.quote}"</p>
            <div className="mt-6 pt-5 border-t border-border/30">
              <p className="text-sm font-display font-bold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
