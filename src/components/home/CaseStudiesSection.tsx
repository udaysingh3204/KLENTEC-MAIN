import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import creative3 from "@/assets/creative-3.jpg";

const caseStudies = [
  {
    title: "TechNova - B2B SaaS",
    result: "320% Lead Growth",
    detail: "Rebuilt entire marketing funnel + automation. From 20 to 80+ qualified leads monthly in 90 days. Tech: Next.js, HubSpot, Zapier.",
    metric: "+$150K MRR projected",
  },
  {
    title: "RetailMax - E-commerce",
    result: "4.2X ROAS",
    detail: "Redesigned website + conversion optimization + AI chatbot for support. Recovered abandoned carts with 40% recovery rate. Tech: React, Shopify, OpenAI.",
    metric: "+$280K revenue in 6 months",
  },
  {
    title: "ConsultPro - Services",
    result: "5X Lead Pipeline",
    detail: "Full brand overhaul + content strategy + LinkedIn automation. Now getting 50+ qualified inquiries/month consistently. Tech: WordPress, LinkedIn API.",
    metric: "Closed $1.2M in contracts",
  },
  {
    title: "HealthPlus - Telemedicine",
    result: "2.8X Monthly Users",
    detail: "Viral loop implementation + referral mechanics + organic growth strategy. User acquisition grew from 200 to 2,400 sign-ups monthly. Tech: Flutter, Firebase.",
    metric: "10% referral-driven growth",
  },
  {
    title: "EduSmart - EdTech Platform",
    result: "285% Enrollment Growth",
    detail: "Course page redesign + enrollment flow optimization + cohort-based model. Student base grew from 5K to 14K with 67% completion rates. Tech: Next.js, Stripe.",
    metric: "$125K MRR revenue",
  },
];

const CaseStudiesSection = () => (
  <section className="section-padding gradient-bg-soft">
    <div className="container mx-auto">
      <SectionHeading
        badge="Case Studies"
        title="Proven Wins Across Industries"
        subtitle="See how we turn struggling businesses into market leaders. Every number below is real."
      />
      <div className="grid grid-cols-1 gap-6 mt-12">
        {caseStudies.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card-dreamy p-8 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">{c.title}</p>
                </div>
                <p className="text-4xl font-display font-bold gradient-text mb-3">{c.result}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{c.detail}</p>
                <p className="text-xs font-semibold text-primary">💰 {c.metric}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link to="/work" className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm">
          View All Case Studies <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default CaseStudiesSection;
