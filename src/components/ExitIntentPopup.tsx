import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, MessageCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ExitData {
  name: string;
  email: string;
  whatsapp: string;
  need: string;
}

const ExitIntentPopup = () => {
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [form, setForm] = useState<ExitData>({ name: "", email: "", whatsapp: "", need: "" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check if already dismissed today
    const dismissed = localStorage.getItem("exit-popup-dismissed");
    if (dismissed) { setDismissed(true); return; }

    // Exit intent: mouse leaves toward top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !shown && !dismissed) {
        setVisible(true);
        setShown(true);
      }
    };

    // Mobile: show after 40 seconds
    const timer = setTimeout(() => {
      if (!shown && !dismissed) {
        setVisible(true);
        setShown(true);
      }
    }, 40000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, [shown, dismissed]);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem("exit-popup-dismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Save to Supabase
    await supabase.from("inquiries").insert({
      name: form.name,
      email: form.email,
      whatsapp: form.whatsapp,
      services: form.need,
      status: "new",
      source: "exit-intent-popup",
    });

    setSuccess(true);
    setSending(false);

    // Close after 2 seconds
    setTimeout(() => {
      handleClose();
      setSuccess(false);
      setForm({ name: "", email: "", whatsapp: "", need: "" });
    }, 2000);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl bg-white flex flex-col md:flex-row">
              {/* Left — Testimonial + Trust */}
              <div
                className="w-full md:w-2/5 p-8 md:p-10 text-white flex flex-col justify-between relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #0d0118 0%, #1a0033 50%, #2d0052 100%)",
                }}
              >
                {/* Background glow */}
                <div className="absolute inset-0 opacity-30"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 40% 40%, hsl(260 80% 40%), transparent)",
                  }}
                />

                <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 leading-tight">
                    Hold on — <br />
                    <span
                      style={{
                        background:
                          "linear-gradient(135deg, #c084fc 0%, #818cf8 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Your growth matters.
                    </span>
                  </h2>

                  {/* Testimonial */}
                  <div className="mb-8 p-5 rounded-2xl bg-white/8 border border-white/15">
                    <p className="text-sm leading-relaxed italic text-white/90 mb-4">
                      "KLENTEC transformed our brand visibility in 60 days. Their team understood our goals and delivered beyond expectations."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
                      <div>
                        <p className="text-sm font-semibold text-white">Rahul Sharma</p>
                        <p className="text-xs text-white/60">Founder, TechNova</p>
                      </div>
                    </div>
                  </div>

                  {/* Trust badges */}
                  <div className="space-y-2 pt-4 border-t border-white/15">
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      NDA signed before every project
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <MessageCircle className="w-4 h-4 text-blue-400" />
                      Response within 4 business hours
                    </div>
                  </div>
                </div>

                {/* Award badges */}
                <div className="relative z-10 flex flex-wrap gap-3 text-[10px] text-white/40 pt-6 border-t border-white/10">
                  <span>🏆 150+ Projects</span>
                  <span>⭐ 4.2X Avg ROAS</span>
                  <span>📈 95% Retention</span>
                </div>
              </div>

              {/* Right — Quick Form */}
              <div className="w-full md:w-3/5 p-8 md:p-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-display font-bold text-slate-900">
                    Share Your Vision
                  </h3>
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-48 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                      <ShieldCheck className="w-6 h-6 text-emerald-600" />
                    </div>
                    <p className="text-lg font-display font-bold text-slate-900">Got it!</p>
                    <p className="text-sm text-slate-500 mt-1">
                      Our team will reach out within 4 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Your Name"
                        required
                        className="px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all"
                      />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        placeholder="you@company.com"
                        required
                        className="px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all"
                      />
                    </div>

                    <input
                      type="tel"
                      value={form.whatsapp}
                      onChange={(e) => setForm((p) => ({ ...p, whatsapp: e.target.value }))}
                      placeholder="WhatsApp: +91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all"
                    />

                    <textarea
                      value={form.need}
                      onChange={(e) => setForm((p) => ({ ...p, need: e.target.value }))}
                      placeholder="What do you need? (website, branding, AI automation, etc.)"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all resize-none"
                    />

                    {/* Trust badge */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 bg-amber-50 px-3 py-2 rounded-lg border border-amber-100">
                      <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>
                        <strong>Fast response</strong> — NDA-protected • Zero spam
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all disabled:opacity-60 hover:-translate-y-0.5"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(260 65% 55%), hsl(260 60% 45%))",
                        boxShadow: "0 4px 20px hsl(260 65% 55% / 0.3)",
                      }}
                    >
                      {sending ? "Saving..." : "Let's Talk"}
                    </button>

                    <p className="text-[10px] text-slate-400 text-center">
                      💬 Chat on{" "}
                      <a
                        href="https://wa.me/919557630336"
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-600 hover:underline"
                      >
                        WhatsApp
                      </a>{" "}
                      for instant response
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
