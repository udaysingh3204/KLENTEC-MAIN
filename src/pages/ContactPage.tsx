import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { submitInquiry } from "@/services/inquiryService";
import { getCTAData, getFormPreFill, clearCTAData } from "@/services/ctaService";
import { SEO } from "@/components/SEO";
import { HoneypotField } from "@/components/HoneypotField";
import { useSpamGuard } from "@/hooks/useSpamGuard";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "digital-marketing",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const { isLikelyBot } = useSpamGuard();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle CTA pre-fill on mount
  useEffect(() => {
    const ctaData = getCTAData();
    if (ctaData) {
      const preFill = getFormPreFill(ctaData.type);
      setFormData((prev) => ({
        ...prev,
        service: preFill.serviceInterest || prev.service,
        message: preFill.message || prev.message,
      }));
      clearCTAData();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLikelyBot(honeypot)) {
      // Silently pretend success — never tip off a bot that it was caught.
      setSubmitted(true);
      setFormData({ name: "", email: "", company: "", phone: "", service: "digital-marketing", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await submitInquiry({
        name: formData.name,
        email: formData.email,
        whatsapp: formData.phone,
        company: formData.company,
        services: formData.service,
        notes: formData.message,
        source: "contact-form",
      });

      setSubmitted(true);
      setFormData({ name: "", email: "", company: "", phone: "", service: "digital-marketing", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors";

  return (
    <main className="min-h-screen">
      <SEO
        title="Contact"
        description="Get in touch with KLENTEC. Free strategy calls, 2-hour response time, no obligation."
        path="/contact"
      />
      <section className="relative gradient-bg-hero pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-dreamy mb-6 inline-block">Get In Touch</span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">
              Let's Work <span className="gradient-text">Together</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your digital presence? Get in touch.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:col-span-2">
              <h2 className="text-3xl font-display font-bold text-foreground mb-8">Get in Touch</h2>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card-dreamy p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">Message Received!</h3>
                  <p className="text-muted-foreground">We've saved your inquiry and will contact you within 2 hours.</p>
                </motion.div>
              ) : error ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card-dreamy p-8 text-center border-destructive/30">
                  <p className="text-destructive font-semibold">{error}</p>
                  <Button onClick={() => setError("")} className="btn-ghost mt-4 text-sm">Dismiss</Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <HoneypotField value={honeypot} onChange={setHoneypot} />
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      minLength={2}
                      maxLength={100}
                      className={inputClasses}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        pattern="[0-9+\-\s()]{7,20}"
                        title="Enter a valid phone number"
                        className={inputClasses}
                        placeholder="+91 9557 630336"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Service Interest</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="web-development">Web Development</option>
                      <option value="design-branding">Design & Branding</option>
                      <option value="automation">Automation & Integration</option>
                      <option value="strategy">Strategy & Consulting</option>
                      <option value="managed-services">Managed Services</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      minLength={10}
                      maxLength={2000}
                      rows={5}
                      className={inputClasses}
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <Button type="submit" disabled={loading} size="lg" className="btn-primary-gradient w-full disabled:opacity-50">
                    {loading ? "Sending..." : "Send Message"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-8">
              <div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-6">Contact Info</h3>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <a href="mailto:hello@klentec.com" className="hover:text-primary transition-colors">hello@klentec.com</a>
                  </div>
                  <div>
                    <a href="tel:+919557630336" className="hover:text-primary transition-colors">+91 9557 630336</a>
                  </div>
                  <div>
                    <a href="https://wa.me/919557630336" className="hover:text-primary transition-colors">WhatsApp</a>
                  </div>
                </div>
              </div>

              <div className="card-dreamy p-6 space-y-3">
                <h4 className="font-display font-semibold text-foreground">Why Us?</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>2-hour response</li>
                  <li>Free strategy calls</li>
                  <li>No credit card</li>
                  <li>Expert team</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding gradient-bg-subtle">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12">Common Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: "How quickly will I hear back?", a: "Within 2 hours during business hours." },
              { q: "Do you offer free consultation?", a: "Yes! Completely free, no obligation." },
              { q: "What's your typical timeline?", a: "4-12 weeks depending on scope." },
              { q: "How do you charge?", a: "Fixed fees, retainers, or performance-based." },
              { q: "Do you work with startups?", a: "Yes, all stages from pre-launch to enterprise." },
              { q: "What's your onboarding?", a: "Discovery → Plan → Alignment → Launch." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="card-dreamy p-6">
                <h3 className="font-display font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-muted-foreground text-sm">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
