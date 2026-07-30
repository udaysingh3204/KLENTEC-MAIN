import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FAQItem {
  category: string;
  questions: {
    id: string;
    q: string;
    a: string;
  }[];
}

const FAQPage = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqData: FAQItem[] = [
    {
      category: "General",
      questions: [
        {
          id: "q1",
          q: "What is KLENTEC?",
          a: "KLENTEC is a digital agency that builds custom digital solutions for businesses. We specialize in performance marketing, web development, design, and AI automation to help companies scale their revenue.",
        },
        {
          id: "q2",
          q: "How long has KLENTEC been in business?",
          a: "KLENTEC has over 10 years of experience helping businesses transform their digital presence. We've worked with 150+ brands across various industries.",
        },
        {
          id: "q3",
          q: "Where is KLENTEC located?",
          a: "We're based in Noida, Uttar Pradesh, India. While we're a local company, we serve clients globally.",
        },
      ],
    },
    {
      category: "Services",
      questions: [
        {
          id: "q4",
          q: "What services do you offer?",
          a: "We offer digital marketing, web development, design & branding, AI automation, and UI/UX design. We also have our 24-Hour Web Dev service for rapid website launches.",
        },
        {
          id: "q5",
          q: "Do you offer custom development?",
          a: "Yes! All our development is custom-built for your specific needs. We work with React, Node.js, and modern web technologies to create scalable solutions.",
        },
        {
          id: "q6",
          q: "Can you help with digital marketing?",
          a: "Absolutely. Our performance marketing team specializes in driving measurable results through SEO, paid ads, content marketing, and conversion optimization.",
        },
        {
          id: "q7",
          q: "What is the 24-Hour Web Dev service?",
          a: "It's our accelerated service where we build a complete business website from strategy to launch in just 24 hours. Perfect for startups and businesses that need to move fast.",
        },
      ],
    },
    {
      category: "Process & Timeline",
      questions: [
        {
          id: "q8",
          q: "How long does a typical project take?",
          a: "It depends on the scope. Our 24-Hour Web Dev is exactly that—24 hours. Larger projects typically take 4-12 weeks depending on complexity.",
        },
        {
          id: "q9",
          q: "What's your project process?",
          a: "We follow a proven 5-step process: Discovery & Strategy → Design & Wireframes → Development → Testing & QA → Launch & Optimization.",
        },
        {
          id: "q10",
          q: "Do you provide ongoing support after launch?",
          a: "Yes! We offer maintenance, updates, and optimization services after launch. We can discuss support packages that fit your needs.",
        },
      ],
    },
    {
      category: "Pricing & Investment",
      questions: [
        {
          id: "q11",
          q: "How much do your services cost?",
          a: "Pricing varies based on project scope. Our 24-Hour Web Dev starts at ₹12,499. We offer flexible packages for different budgets. Contact us for a custom quote.",
        },
        {
          id: "q12",
          q: "Do you offer payment plans?",
          a: "Yes, we can discuss flexible payment options for larger projects. We typically work with 50/50 splits (upfront & completion) or milestone-based payments.",
        },
        {
          id: "q13",
          q: "Is there a free consultation?",
          a: "Absolutely! We offer a free strategy call where we discuss your goals, challenges, and how we can help. No obligation, just honest advice.",
        },
      ],
    },
    {
      category: "Collaboration",
      questions: [
        {
          id: "q14",
          q: "How do we stay updated during the project?",
          a: "We provide regular updates, share progress via our dashboard, and schedule check-ins to ensure we're aligned with your vision.",
        },
        {
          id: "q15",
          q: "Can we request revisions?",
          a: "Yes! Our packages include revision rounds. We'll work with you until you're 100% satisfied with the deliverables.",
        },
        {
          id: "q16",
          q: "What if we need to pause or cancel?",
          a: "We understand circumstances change. We'll discuss your situation and work out a fair arrangement based on work completed.",
        },
      ],
    },
    {
      category: "Technology & Performance",
      questions: [
        {
          id: "q17",
          q: "What technologies do you use?",
          a: "We use modern, scalable tech: React, TypeScript, Node.js, Tailwind CSS, PostgreSQL, and cloud platforms like Vercel and AWS.",
        },
        {
          id: "q18",
          q: "Is my website mobile-responsive?",
          a: "100%. All our websites are built mobile-first and fully responsive across all devices. We also test on real devices.",
        },
        {
          id: "q19",
          q: "What about SEO?",
          a: "SEO is built into our development process. We optimize structure, metadata, performance, and follow best practices for search visibility.",
        },
        {
          id: "q20",
          q: "How fast are your websites?",
          a: "We aim for Lighthouse scores of 90+. Our 24-Hour Web Dev sites achieve 1.2-2.0s load times with optimized images and code.",
        },
      ],
    },
  ];

  // Filter FAQs based on search
  const filteredFAQs = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-purple-900/20 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Can't find the answer you're looking for? Contact us directly and we'll help within 2 hours.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">No matching FAQs found. Try a different search term.</p>
            </div>
          ) : (
            filteredFAQs.map((category) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                {/* Category Title */}
                <h2 className="text-2xl font-bold text-white mb-6">{category.category}</h2>

                {/* FAQ Items */}
                <div className="space-y-4">
                  {category.questions.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="border border-slate-800 rounded-lg overflow-hidden hover:border-purple-500/50 transition-colors"
                    >
                      <button
                        onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                        className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors group"
                      >
                        <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                          {item.q}
                        </h3>
                        <ChevronDown
                          size={20}
                          className={`flex-shrink-0 text-slate-500 transition-transform duration-300 ${
                            expandedId === item.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {expandedId === item.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 py-4 bg-slate-800/30 border-t border-slate-800 text-slate-300">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Still have questions?</h2>
            <p className="text-slate-400 mb-8">
              Our team is ready to help. Schedule a free consultation or reach out directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-lg">
                  Contact Us
                </Button>
              </a>
              <a href="tel:+919557630336">
                <Button
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:border-purple-500 hover:text-purple-400 font-semibold px-8 py-3 rounded-lg"
                >
                  Call Now
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default FAQPage;
