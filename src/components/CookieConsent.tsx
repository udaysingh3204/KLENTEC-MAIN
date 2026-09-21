import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const STORAGE_KEY = "cookie-consent";

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage unavailable (private mode, blocked storage) — skip silently
    }
  }, []);

  const dismiss = (choice: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // ignore
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50"
        >
          <div className="card-dreamy p-5 shadow-lg">
            <p className="text-sm text-foreground font-medium mb-1">We use cookies</p>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              We use minimal, privacy-friendly analytics to understand how visitors use this site.
              See our <Link to="/privacy" className="text-primary underline hover:no-underline">Privacy Policy</Link> for details.
            </p>
            <div className="flex gap-2">
              <button onClick={() => dismiss("accepted")} className="btn-dreamy flex-1 text-xs py-2">
                Accept
              </button>
              <button
                onClick={() => dismiss("declined")}
                className="btn-ghost flex-1 text-xs py-2"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
