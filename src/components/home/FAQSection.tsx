import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "How long before I see results?", a: "Most clients start seeing measurable improvements within 30–60 days." },
  { q: "Do you work with small businesses?", a: "Yes, if you're serious about scaling. We work with startups, SMBs, and enterprises alike." },
  { q: "What makes KLENTEC different?", a: "We focus on systems and results, not just services. Every project is designed for scalable growth." },
  { q: "Do you offer custom solutions?", a: "Every project is tailored to your business. No cookie-cutter templates." },
  { q: "What industries do you serve?", a: "E-commerce, SaaS, real estate, healthcare, education, and more — any ambitious brand looking to grow." },
];

const FAQSection = () => (
  <section id="faq" className="section-padding gradient-bg-soft">
    <div className="container mx-auto max-w-2xl">
      <SectionHeading badge="FAQ" title="Frequently Asked Questions" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="card-dreamy px-7 border rounded-2xl">
              <AccordionTrigger className="text-sm font-display font-semibold text-foreground hover:no-underline py-6">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQSection;
