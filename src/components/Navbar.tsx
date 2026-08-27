import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Contact", to: "/contact" },
];

const companyLinks = [
  { label: "About", to: "/about" },
  { label: "Team", to: "/team" },
  { label: "Careers", to: "/careers" },
];

const specialLink = { label: "24-Hour Web Dev", to: "/services/24-hour-web-dev" };

const LogoPattern = ({ scrolled }: { scrolled: boolean }) => (
  <img
    src={logoWhite}
    alt="KLENTEC"
    className={`transition-all duration-300 ${scrolled ? "h-10" : "h-28"} w-auto`}
  />
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
      <div className={`container mx-auto flex items-center justify-between px-6 transition-all duration-300 ${scrolled ? "h-16" : "h-32"}`}>
        <Link to="/" className="flex items-center gap-3">
          <LogoPattern scrolled={scrolled} />
          {!scrolled && (
            <span className="hidden xl:flex items-center gap-3 pl-1">
              <span className="w-px h-8 bg-border/50" />
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground leading-snug whitespace-nowrap">
                We Build
                <br />
                Digital Machines
              </span>
            </span>
          )}
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.slice(0, 3).map((link) => (
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

          {/* Company dropdown: About / Team / Careers */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`flex items-center gap-1 text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-300 hover:text-primary outline-none relative ${
                companyLinks.some((l) => l.to === location.pathname)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Company
              <ChevronDown className="w-3.5 h-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[10rem] bg-card border-border/50">
              {companyLinks.map((link) => (
                <DropdownMenuItem key={link.to} asChild>
                  <Link
                    to={link.to}
                    className={`cursor-pointer text-sm ${
                      location.pathname === link.to ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navLinks.slice(3).map((link) => (
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
                {navLinks.slice(0, 3).map((link) => (
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

                <p className="text-[11px] font-semibold tracking-widest uppercase text-slate-500 px-4 pt-2 pb-1">
                  Company
                </p>
                {companyLinks.map((link) => (
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

                {navLinks.slice(3).map((link) => (
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
