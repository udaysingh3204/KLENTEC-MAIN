import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";

const steps = [
  {
    title: "What do you need help with?",
    options: ["Marketing", "Branding", "Website/App", "Full Package"],
    key: "service",
  },
  {
    title: "What's your budget?",
    options: ["₹50K – ₹1L", "₹1L – ₹5L", "₹5L+"],
    key: "budget",
  },
  {
    title: "Timeline?",
    options: ["ASAP", "1–2 Months", "Flexible"],
    key: "timeline",
  },
];

const ContactPage = () => {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [details, setDetails] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  const selectOption = (key: string, value: string) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => setStep((s) => s + 1), 250);
  };

  const handleSubmit = () => setSubmitted(true);

  return (
    <main>
      <section className="relative min-h-screen flex items-center justify-center gradient-bg-hero pt-28 pb-16">
        <div className="container mx-auto px-6 relative z-10 max-w-xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-10">
            <span className="badge-pill mb-6 inline-block">Contact Us</span>
            <h1 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight">
              Let's Build Something <span className="gradient-text">Powerful</span>
            </h1>
            <p className="mt-3 text-muted-foreground text-sm">Tell us about your project — we'll handle the rest.</p>
          </motion.div>

          {/* Progress */}
          <div className="w-full h-1.5 bg-muted rounded-full mb-8 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(252 75% 60%), hsl(200 100% 55%))" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-elevated p-12 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground">We'll be in touch!</h2>
              <p className="mt-3 text-muted-foreground text-sm">Thank you for reaching out. Our team will contact you shortly.</p>
            </motion.div>
          ) : (
            <div className="card-elevated p-8 md:p-10">
              <AnimatePresence mode="wait">
                {step < 3 ? (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="text-xs text-muted-foreground mb-1.5">Step {step + 1} of {totalSteps}</p>
                    <h2 className="text-xl font-display font-bold text-foreground mb-6">
                      {steps[step].title}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {steps[step].options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => selectOption(steps[step].key, opt)}
                          className={`p-4 rounded-xl border text-left text-sm font-medium transition-all duration-200 hover:scale-[1.02] ${
                            selections[steps[step].key] === opt
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border bg-background text-foreground hover:border-primary/30"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="text-xs text-muted-foreground mb-1.5">Step 4 of {totalSteps}</p>
                    <h2 className="text-xl font-display font-bold text-foreground mb-6">Your Details</h2>
                    <div className="space-y-3">
                      {(["name", "email", "phone"] as const).map((field) => (
                        <input
                          key={field}
                          type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                          value={details[field]}
                          onChange={(e) => setDetails((prev) => ({ ...prev, [field]: e.target.value }))}
                          className="w-full p-3.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      ))}
                      <button
                        onClick={handleSubmit}
                        disabled={!details.name || !details.email}
                        className="w-full btn-primary-gradient py-3.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Start My Project <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {step > 0 && !submitted && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="mt-5 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
