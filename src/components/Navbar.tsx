import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import { CurrencySelector } from "@/components/CurrencySelector";

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
  <div className="relative">
    {/* Main logo — scales down on scroll */}
    <img src={logoWhite} alt="KLENTEC" className={`relative z-10 transition-all duration-300 ${scrolled ? "h-9" : "h-16"} w-auto`} />

    {/* Orbiting dots - hidden on scroll for cleaner navbar */}
    {!scrolled && [0, 1, 2, 3, 4, 5].map((i) => (
      <span
        key={i}
        className="absolute top-1/2 left-1/2 orbit-dot"
        style={{
          "--orbit-radius": `${40 + i * 8}px`,
          "--orbit-duration": `${6 + i * 2}s`,
          animationDelay: `${i * -1.2}s`,
          width: `${4 + (i % 3)}px`,
          height: `${4 + (i % 3)}px`,
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
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary/20 pulse-dot" style={{ animationDelay: "0s" }} />
        <span className="absolute -bottom-1 -left-2 w-1.5 h-1.5 rounded-full bg-primary/15 pulse-dot" style={{ animationDelay: "1s" }} />
        <span className="absolute top-1/2 -right-3 w-1 h-1 rounded-full bg-primary/25 pulse-dot" style={{ animationDelay: "2s" }} />
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
      <div className="container mx-auto flex items-center justify-between h-20 px-6">
        <Link to="/" className="flex items-center">
          <LogoPattern scrolled={scrolled} />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium tracking-wide transition-all duration-300 hover:text-primary relative ${
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
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              location.pathname === specialLink.to
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                : "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
            }`}
          >
            ⚡ {specialLink.label}
          </Link>
        </div>

        {/* Desktop — CTA Section */}
        <div className="hidden md:flex items-center gap-4">
          <CurrencySelector />
          <Link to="/contact" className="btn-dreamy text-sm">
            Book Free Strategy Call
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground p-2"
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
            className="md:hidden bg-card/95 backdrop-blur-xl border-t border-border/30 overflow-hidden"
          >
            <div className="flex flex-col gap-1 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium py-3 px-5 rounded-2xl transition-colors ${
                    location.pathname === link.to
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to={specialLink.to}
                className={`text-sm font-semibold py-3 px-5 rounded-2xl transition-colors ${
                  location.pathname === specialLink.to
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                    : "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
                }`}
              >
                ⚡ {specialLink.label}
              </Link>

              <div className="border-t border-border/30 mt-4 pt-4 space-y-3">
                <div className="flex justify-center">
                  <CurrencySelector />
                </div>
                <Link to="/contact" className="btn-dreamy text-center w-full block">
                  Book Free Strategy Call
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
