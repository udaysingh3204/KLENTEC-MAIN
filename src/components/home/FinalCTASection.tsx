import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FinalCTASection = () => (
  <section className="section-padding relative overflow-hidden">
    {/* Background elements */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
    </div>

    <div className="container mx-auto text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight leading-tight">
          Your Competitors Are Already Scaling.{" "}
          <span className="gradient-text">Don't Get Left Behind.</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Every month you wait is revenue you're leaving on the table. Our clients average 4.2x ROAS on ad campaigns in the first 90 days. The only question is: will you be next?
        </p>

        {/* Social Proof */}
        <div className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto mb-10">
          {[
            { emoji: "⚡", text: "90-day results" },
            { emoji: "📈", text: "4.2x avg ROAS" },
            { emoji: "🎯", text: "Real results" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <span className="text-3xl">{item.emoji}</span>
              <p className="text-xs text-muted-foreground mt-2">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/contact" className="btn-dreamy px-12 py-5 text-base inline-flex items-center gap-2">
            🚀 Start Your Growth Journey
          </Link>
          <Link to="/contact" className="btn-ghost px-12 py-5 text-base">
            Schedule Free Strategy Call
          </Link>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          ✓ No credit card required · ✓ 30-minute strategy call · ✓ Personalized growth roadmap
        </p>
      </motion.div>
    </div>
  </section>
);

export default FinalCTASection;
