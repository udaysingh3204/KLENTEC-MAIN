import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
  Globe,
  Instagram,
  Linkedin,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
  Handshake,
  Wallet,
  BadgeCheck,
  CalendarClock,
} from "lucide-react";

/* ----------------------------- Wizard config ----------------------------- */

type Field =
  | { type: "text"; key: string; label: string; placeholder?: string; required?: boolean }
  | { type: "choice"; key: string; label: string; options: string[]; required?: boolean }
  | { type: "textarea"; key: string; label: string; placeholder?: string; required?: boolean };

const sections: { id: string; title: string; subtitle: string; fields: Field[] }[] = [
  {
    id: "A",
    title: "Your Details",
    subtitle: "Tell us a little about you.",
    fields: [
      { type: "text", key: "name", label: "Full Name", placeholder: "e.g. Rahul Sharma", required: true },
      { type: "text", key: "company", label: "Company / Brand", placeholder: "e.g. TechNova Pvt. Ltd.", required: true },
      { type: "text", key: "email", label: "Email Address", placeholder: "you@brand.com", required: true },
      { type: "text", key: "whatsapp", label: "WhatsApp Number", placeholder: "+91 98765 43210", required: true },
      { type: "text", key: "link", label: "Website / Social (optional)", placeholder: "https://…" },
    ],
  },
  {
    id: "B",
    title: "Project Details",
    subtitle: "What are we building together?",
    fields: [
      { type: "text", key: "services", label: "Services You Need", placeholder: "Logo + Website + Social Media", required: true },
      {
        type: "choice",
        key: "stage",
        label: "Business Stage",
        options: ["Just Starting", "Growing", "Scaling", "Established"],
        required: true,
      },
      { type: "textarea", key: "about", label: "About Your Business", placeholder: "What you do, who you serve, what problem you solve.", required: true },
      { type: "textarea", key: "goal", label: "Main Goal Right Now", placeholder: "Launch brand, get leads, build app, automate…", required: true },
    ],
  },
  {
    id: "C",
    title: "Budget & Timeline",
    subtitle: "We have solutions for every budget.",
    fields: [
      {
        type: "choice",
        key: "budget",
        label: "Approximate Budget",
        options: ["Under ₹25K", "₹25K – ₹1L", "₹1L – ₹5L", "₹5L+"],
        required: true,
      },
      {
        type: "choice",
        key: "timeline",
        label: "Delivery Timeline",
        options: ["ASAP", "1–4 Weeks", "1–2 Months", "Flexible"],
        required: true,
      },
      { type: "text", key: "deadline", label: "Specific Deadline (optional)", placeholder: "Launch on 15 Aug…" },
    ],
  },
  {
    id: "D",
    title: "Final Notes",
    subtitle: "Almost done.",
    fields: [
      {
        type: "choice",
        key: "source",
        label: "How did you hear about us?",
        options: ["Instagram", "LinkedIn", "Google", "Referral", "Other"],
        required: true,
      },
      { type: "textarea", key: "notes", label: "Anything else? (optional)", placeholder: "References, inspiration, competitors…" },
    ],
  },
];

/* -------------------------------- Contact -------------------------------- */

const channels = [
  { Icon: Phone, label: "Phone", value: "+91 95576 30336", sub: "Mon – Sat · 10 AM – 7 PM IST", href: "tel:+919557630336" },
  { Icon: Mail, label: "Email", value: "hello@klentec.com", sub: "Proposals within 24 hours", href: "mailto:hello@klentec.com" },
  { Icon: MessageCircle, label: "WhatsApp", value: "wa.me/919557630336", sub: "Send ‘HELLO’ to start", href: "https://wa.me/919557630336" },
  { Icon: Globe, label: "Website", value: "www.klentec.com", sub: "Remote-first · Global", href: "https://klentec.com" },
  { Icon: Instagram, label: "Instagram", value: "@klentec.in", sub: "Behind the scenes", href: "https://instagram.com/klentec.in" },
  { Icon: Linkedin, label: "LinkedIn", value: "Uday Singh", sub: "Founder · KLENTEC", href: "https://www.linkedin.com/in/uday-singh-57b986404" },
];

const process = [
  { n: "01", t: "Free Discovery Call", d: "A 30-minute strategy call — no pitch, just honest conversation about your goals." },
  { n: "02", t: "Custom Proposal in 24h", d: "Detailed scope, timeline and transparent pricing — zero hidden costs." },
  { n: "03", t: "Onboarding & Roadmap", d: "Dedicated project manager assigned. Custom roadmap built for your brand." },
  { n: "04", t: "Execution & Delivery", d: "Designers, developers, marketers and AI experts deliver with precision." },
  { n: "05", t: "Review & Refinement", d: "Revision cycles until every deliverable exceeds your expectations." },
  { n: "06", t: "Launch & Ongoing Growth", d: "Post-launch support, analytics and strategies to scale your business." },
];

const reasons = [
  { Icon: Handshake, t: "One Roof for Everything", d: "Design, dev, marketing, AI & fintech — one team, one invoice, zero chaos." },
  { Icon: Clock, t: "4-Hour Response Guarantee", d: "Every inquiry is acknowledged within 4 business hours." },
  { Icon: Wallet, t: "Transparent Pricing", d: "No hidden fees. No surprise invoices. Clear scope from day one." },
  { Icon: BadgeCheck, t: "Dedicated Account Manager", d: "One point of contact who knows your brand inside out." },
  { Icon: Sparkles, t: "AI & Automation Ready", d: "Intelligent systems that scale your operations without extra headcount." },
  { Icon: ShieldCheck, t: "NDA Before Every Project", d: "Your ideas are protected. We sign NDAs before discussing details." },
];

const promises = [
  "Free 30-minute strategy call — zero obligation.",
  "We sign an NDA before discussing your project.",
  "Custom proposal delivered within 24 hours.",
  "Milestone-based payments — pay as work progresses.",
  "EMI options available for all projects above ₹50,000.",
  "Dedicated WhatsApp support group for every project.",
  "Limited new clients per month — quality over quantity.",
];

/* --------------------------------- Page ---------------------------------- */

const ContactPage = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = sections.length;
  const progress = ((step + 1) / totalSteps) * 100;
  const current = sections[step];

  const setField = (key: string, value: string) => setData((p) => ({ ...p, [key]: value }));

  const canContinue = current.fields.every((f) => !f.required || (data[f.key] && data[f.key].trim().length > 0));

  const handleSubmit = () => setSubmitted(true);

  return (
    <main className="overflow-hidden">
      {/* ----------------------------- Hero ----------------------------- */}
      <section className="relative gradient-bg-hero pt-36 pb-20">
        <div className="container mx-auto px-6 text-center max-w-3xl relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge-dreamy"
          >
            <Sparkles className="w-3.5 h-3.5" /> Get in touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.6 }}
            className="mt-6 text-5xl md:text-7xl font-display tracking-tight leading-[1.05]"
          >
            Your Growth Partner —<br />
            <em className="gradient-text not-italic">from idea to empire.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-6 text-lg text-muted-foreground leading-relaxed"
          >
            We respond to every inquiry within 4 business hours — because your time matters.
          </motion.p>
        </div>
      </section>

      {/* --------------------------- Channels --------------------------- */}
      <section className="section-padding pt-0">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {channels.map(({ Icon, label, value, sub, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="card-dreamy p-6 flex items-start gap-4 group"
              >
                <span className="icon-dreamy shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
                  <p className="font-display text-xl mt-1 truncate group-hover:text-primary transition-colors">
                    {value}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{sub}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> India · Remote-first · Serving globally</span>
            <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Replies within 4 business hours</span>
          </div>
        </div>
      </section>

      {/* --------------------------- Wizard ----------------------------- */}
      <section className="section-padding pt-0">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge-dreamy">Client inquiry</span>
            <h2 className="mt-5 text-4xl md:text-5xl font-display tracking-tight">
              Tell us about your <em className="gradient-text not-italic">project.</em>
            </h2>
            <p className="mt-3 text-muted-foreground">Less than 3 minutes. Custom proposal within 24 hours.</p>
          </div>

          <div className="card-dreamy p-8 md:p-10">
            {/* Progress */}
            <div className="flex items-center justify-between mb-2 text-xs tracking-widest uppercase text-muted-foreground">
              <span>Section {current.id} of D</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-1 bg-muted rounded-full mb-8 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, hsl(var(--purple-mid)), hsl(var(--purple-glow)))" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-display tracking-tight">Thank you, {data.name?.split(" ")[0] || "friend"}.</h3>
                <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                  Your inquiry has reached our team. Expect a personal reply from us within 4 business hours.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="https://wa.me/919557630336" target="_blank" rel="noreferrer" className="btn-dreamy">
                    Chat on WhatsApp
                  </a>
                  <a href="mailto:hello@klentec.com" className="btn-ghost">Email Us</a>
                </div>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="text-2xl md:text-3xl font-display tracking-tight">{current.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-7">{current.subtitle}</p>

                  <div className="space-y-5">
                    {current.fields.map((f) => (
                      <div key={f.key}>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {f.label}
                          {f.required && <span className="text-primary/70"> *</span>}
                        </label>

                        {f.type === "text" && (
                          <input
                            type="text"
                            value={data[f.key] || ""}
                            onChange={(e) => setField(f.key, e.target.value)}
                            placeholder={f.placeholder}
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15 transition-all text-sm"
                          />
                        )}

                        {f.type === "textarea" && (
                          <textarea
                            value={data[f.key] || ""}
                            onChange={(e) => setField(f.key, e.target.value)}
                            placeholder={f.placeholder}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15 transition-all text-sm resize-none"
                          />
                        )}

                        {f.type === "choice" && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {f.options.map((opt) => {
                              const selected = data[f.key] === opt;
                              return (
                                <button
                                  type="button"
                                  key={opt}
                                  onClick={() => setField(f.key, opt)}
                                  className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                                    selected
                                      ? "border-primary bg-primary/5 text-primary"
                                      : "border-border bg-background text-foreground hover:border-primary/30"
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <button
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      disabled={step === 0}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>

                    {step < totalSteps - 1 ? (
                      <button
                        onClick={() => canContinue && setStep((s) => s + 1)}
                        disabled={!canContinue}
                        className="btn-dreamy inline-flex items-center gap-2 disabled:opacity-50"
                      >
                        Continue <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={!canContinue}
                        className="btn-dreamy inline-flex items-center gap-2 disabled:opacity-50"
                      >
                        Submit Inquiry <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-5">
            Prefer to send it manually? WhatsApp <span className="text-foreground">+91 95576 30336</span> or email{" "}
            <span className="text-foreground">hello@klentec.com</span> with subject "New Client Inquiry".
          </p>
        </div>
      </section>

      {/* --------------------------- Process ---------------------------- */}
      <section className="section-padding gradient-bg-soft">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="badge-dreamy">How we work</span>
            <h2 className="mt-5 text-4xl md:text-5xl font-display tracking-tight">
              Simple, transparent —<em className="gradient-text not-italic"> always in your favour.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {process.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-dreamy p-7"
              >
                <p className="font-display text-5xl gradient-text leading-none">{p.n}</p>
                <h3 className="mt-5 text-2xl font-display tracking-tight">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- Reasons ---------------------------- */}
      <section className="section-padding">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="badge-dreamy">Why brands choose us</span>
            <h2 className="mt-5 text-4xl md:text-5xl font-display tracking-tight">
              Built for brands that <em className="gradient-text not-italic">refuse to settle.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reasons.map(({ Icon, t, d }, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="card-dreamy p-7"
              >
                <span className="icon-dreamy-lg">
                  <Icon className="w-6 h-6 text-primary" />
                </span>
                <h3 className="mt-5 text-xl font-display tracking-tight">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- Strategy CTA ----------------------- */}
      <section className="section-padding pt-0">
        <div className="container mx-auto max-w-5xl">
          <div className="card-glass p-10 md:p-14 text-center relative overflow-hidden">
            <span className="badge-dreamy">
              <CalendarClock className="w-3.5 h-3.5" /> Free strategy call
            </span>
            <h2 className="mt-5 text-4xl md:text-5xl font-display tracking-tight">
              A real conversation about your <em className="gradient-text not-italic">growth.</em>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              No commitment. No sales pressure. 30 minutes that could change the trajectory of your brand.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/919557630336?text=STRATEGY%20CALL"
                target="_blank"
                rel="noreferrer"
                className="btn-dreamy inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp "STRATEGY CALL"
              </a>
              <a
                href="mailto:hello@klentec.com?subject=STRATEGY%20CALL%20REQUEST"
                className="btn-ghost inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" /> Email Us
              </a>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">Confirmation in 4 hours · Proposal within 24 hours of call</p>
          </div>
        </div>
      </section>

      {/* --------------------------- Promises --------------------------- */}
      <section className="section-padding pt-0">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <span className="badge-dreamy">Our promises</span>
            <h2 className="mt-5 text-4xl md:text-5xl font-display tracking-tight">
              No fine print — just <em className="gradient-text not-italic">commitments.</em>
            </h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {promises.map((p) => (
              <li key={p} className="card-dreamy p-5 flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-foreground/90">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
