import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "digital-marketing",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: "", email: "", company: "", phone: "", service: "digital-marketing", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <section className="relative py-20 bg-gradient-to-br from-slate-950 via-purple-900/20 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">Let's Work Together</h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">Ready to transform your digital presence? Get in touch.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-white mb-8">Get in Touch</h2>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-500/10 border border-green-500/30 rounded-lg p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Message Received!</h3>
                  <p className="text-slate-300">We'll get back to you within 2 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Service Interest</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-purple-500 focus:outline-none"
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
                    <label className="block text-sm font-semibold text-white mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <Button type="submit" disabled={loading} size="lg" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold disabled:opacity-50">
                    {loading ? "Sending..." : "Send Message"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Contact Info</h3>
                <div className="space-y-4 text-slate-300">
                  <div>
                    <a href="mailto:hello@klentec.com" className="hover:text-purple-400">✉️ hello@klentec.com</a>
                  </div>
                  <div>
                    <a href="tel:+919876543210" className="hover:text-purple-400">📞 +91 98765 43210</a>
                  </div>
                  <div>
                    <a href="https://wa.me/919876543210" className="hover:text-purple-400">💬 WhatsApp</a>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-3">
                <h4 className="font-semibold text-white">Why Us?</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>✓ 2-hour response</li>
                  <li>✓ Free strategy calls</li>
                  <li>✓ No credit card</li>
                  <li>✓ Expert team</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Common Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { q: "How quickly will I hear back?", a: "Within 2 hours during business hours." },
              { q: "Do you offer free consultation?", a: "Yes! Completely free, no obligation." },
              { q: "What's your typical timeline?", a: "4-12 weeks depending on scope." },
              { q: "How do you charge?", a: "Fixed fees, retainers, or performance-based." },
              { q: "Do you work with startups?", a: "Yes, all stages from pre-launch to enterprise." },
              { q: "What's your onboarding?", a: "Discovery → Plan → Alignment → Launch." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="font-semibold text-white mb-2">{item.q}</h3>
                <p className="text-slate-400 text-sm">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
