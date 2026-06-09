import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How fast will I see results?",
    a: "Most clients see first measurable signals (traffic, leads, conversions) within 30–60 days. Significant revenue impact typically materializes by month 3–6. Full-scale growth systems take 6–12 months to optimize. We guarantee results or we don't charge you — that's how confident we are.",
  },
  {
    q: "What if we're a startup or small business?",
    a: "Our sweet spot is ambitious businesses doing $100K annually to enterprise scale. If you're serious about scaling (not just maintaining), we'll work with you. Size doesn't matter — mindset does. From funded startups to 500-person companies, we've scaled them all.",
  },
  {
    q: "How is KLENTEC different from other agencies?",
    a: "Most agencies sell services. We sell results. We don't do 'design for design's sake' or 'marketing for marketing's sake.' Everything we build is connected to revenue.",
  },
  {
    q: "What's included in a typical engagement?",
    a: "Strategy audit, website/funnel optimization, marketing automation setup, conversion rate optimization, monthly reporting, and a dedicated account manager. It's a complete growth system.",
  },
  {
    q: "Do you do custom projects or templates?",
    a: "100% custom. We audit your current state, understand your goals, and build a tailored strategy. Every business is different — so should every solution.",
  },
  {
    q: "What industries do you specialize in?",
    a: "E-commerce, SaaS, digital services, real estate, healthcare, education, B2B, B2C — basically any ambitious brand that wants to dominate their market.",
  },
  {
    q: "How do you measure success?",
    a: "Revenue impact, lead quality, conversion rates, customer acquisition cost, and ROI. Every month you get a transparent dashboard showing exactly what's working and why.",
  },
  {
    q: "What's your typical project timeline?",
    a: "Most results-driven engagements run 6–12 months. We front-load strategy in months 1–2, execute heavily in months 3–6, then optimize and scale in months 7+.",
  },
  {
    q: "What's included in the free growth audit?",
    a: "The free growth audit covers 6 areas: website conversion analysis, ad spend efficiency review, SEO gap analysis, competitor positioning audit, funnel drop-off identification, and growth opportunity scorecard. You'll get a detailed report showing exactly where you're losing money and our top 3 recommendations. Delivered within 48 hours of your submission.",
  },
  {
    q: "What industries do you NOT serve?",
    a: "We're selective about partnerships. We don't work with: companies unwilling to commit to a growth mindset (they want quick fixes, not systems), industries with poor unit economics (we want to build sustainable growth), or businesses that ask us to compromise on transparency. We'd rather say no than take a client we can't truly help.",
  },
];

const FAQSection = () => (
  <section id="faq" className="section-padding gradient-bg-soft">
    <div className="container mx-auto max-w-2xl">
      <SectionHeading badge="FAQ" title="Questions? We've Got Answers." subtitle="Everything you need to know about working with KLENTEC." />
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
