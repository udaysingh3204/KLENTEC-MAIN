import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Contact", to: "/contact" },
];

const specialLink = { label: "24-Hour Web Dev", to: "/services/24-hour-web-dev" };

/* Animated orbiting dots around logo */
const LogoPattern = ({ scrolled }: { scrolled: boolean }) => (
  <div className="relative flex items-center justify-center">
    {/* Main logo — scales down on scroll */}
    <img src={logoWhite} alt="KLENTEC" className={`relative z-10 transition-all duration-300 ${scrolled ? "h-10" : "h-24"} w-auto`} />

    {/* Orbiting dots - hidden on scroll for cleaner navbar */}
    {!scrolled && [0, 1, 2, 3, 4, 5].map((i) => (
      <span
        key={i}
        className="absolute top-1/2 left-1/2 orbit-dot"
        style={{
          "--orbit-radius": `${50 + i * 10}px`,
          "--orbit-duration": `${6 + i * 2}s`,
          animationDelay: `${i * -1.2}s`,
          width: `${5 + (i % 3)}px`,
          height: `${5 + (i % 3)}px`,
        } as React.CSSProperties}
      >
        <span
          className="block rounded-full bg-primary/30 pulse-dot"
          style={{
            width: "100%",
            height: "100%",
            animationDelay: `${i * 0.5}s`,
          }}
        />
      </span>
    ))}

    {/* Static glow dots - hidden on scroll */}
    {!scrolled && (
      <>
        <span className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-primary/20 pulse-dot" style={{ animationDelay: "0s" }} />
        <span className="absolute -bottom-2 -left-3 w-2.5 h-2.5 rounded-full bg-primary/15 pulse-dot" style={{ animationDelay: "1s" }} />
        <span className="absolute top-1/2 -right-4 w-1.5 h-1.5 rounded-full bg-primary/25 pulse-dot" style={{ animationDelay: "2s" }} />
      </>
    )}
  </div>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav shadow-sm" : "bg-transparent"
      }`}
    >
      <div className={`container mx-auto flex items-center justify-between px-6 transition-all duration-300 ${scrolled ? "h-16" : "h-28"}`}>
        <Link to="/" className="flex items-center">
          <LogoPattern scrolled={scrolled} />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-300 hover:text-primary relative ${
                location.pathname === link.to
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
              {location.pathname === link.to && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary"
                />
              )}
            </Link>
          ))}

          {/* Special 24-Hour Web Dev Link */}
          <Link
            to={specialLink.to}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
              location.pathname === specialLink.to
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                : "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
            }`}
          >
            ⚡ {specialLink.label}
          </Link>
        </div>

        {/* Desktop — CTA Section */}
        <div className="hidden lg:flex items-center">
          <Link to="/contact" className="btn-nav">
            Book a Call
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-foreground p-2"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 overflow-visible"
          >
            <div className="flex flex-col gap-0 p-4">
              {/* Navigation Links */}
              <nav className="space-y-2 mb-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block w-full text-left py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                      location.pathname === link.to
                        ? "bg-purple-600/30 text-purple-300 border border-purple-600/50"
                        : "text-slate-300 hover:bg-slate-800/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Special 24-Hour Web Dev Link */}
              <Link
                to={specialLink.to}
                className={`block w-full text-center py-3 px-4 rounded-lg text-sm font-semibold mb-4 transition-all ${
                  location.pathname === specialLink.to
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                    : "bg-blue-600/30 text-blue-300 border border-blue-600/50"
                }`}
              >
                ⚡ {specialLink.label}
              </Link>

              {/* Divider */}
              <div className="h-px bg-slate-800 my-4" />

              {/* CTA Button */}
              <Link
                to="/contact"
                className="block w-full text-center py-3 px-4 rounded-lg text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all"
              >
                Book Free Strategy Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
