import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logoBlack from "@/assets/logo-black.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

/* Animated orbiting dots around logo */
const LogoPattern = () => (
  <div className="relative">
    {/* Main logo — 3x bigger */}
    <img src={logoBlack} alt="KLENTEC" className="h-28 w-auto relative z-10" />

    {/* Orbiting dots */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
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

    {/* Static glow dots */}
    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary/20 pulse-dot" style={{ animationDelay: "0s" }} />
    <span className="absolute -bottom-1 -left-2 w-1.5 h-1.5 rounded-full bg-primary/15 pulse-dot" style={{ animationDelay: "1s" }} />
    <span className="absolute top-1/2 -right-3 w-1 h-1 rounded-full bg-primary/25 pulse-dot" style={{ animationDelay: "2s" }} />
  </div>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

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
          <LogoPattern />
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
        </div>

        {/* Desktop — Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {profile ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-muted transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold">
                  {profile.full_name?.[0]?.toUpperCase() || "C"}
                </div>
                <span className="text-sm font-medium text-foreground hidden sm:inline">
                  {profile.full_name?.split(" ")[0] || "User"}
                </span>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-border/50">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Logged in as</p>
                      <p className="text-sm font-semibold text-foreground">{profile.full_name || profile.email}</p>
                    </div>
                    <Link
                      to={profile.role === "admin" ? "/admin" : "/client"}
                      className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-muted transition-colors text-foreground"
                      onClick={() => setProfileOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      {profile.role === "admin" ? "Admin Dashboard" : "Client Portal"}
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-destructive/10 transition-colors text-destructive"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Sign in
              </Link>
              <Link to="/contact" className="btn-dreamy text-sm">
                Start Free
              </Link>
            </>
          )}
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

              {profile ? (
                <>
                  <div className="border-t border-border/30 mt-4 pt-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-bold">
                        {profile.full_name?.[0]?.toUpperCase() || "C"}
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">Logged in as</p>
                        <p className="text-sm font-semibold text-foreground">{profile.full_name || profile.email}</p>
                      </div>
                    </div>
                    <Link
                      to={profile.role === "admin" ? "/admin" : "/client"}
                      className="flex items-center gap-2 w-full py-3 px-5 rounded-2xl bg-accent text-primary text-sm font-medium transition-colors mb-2"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      {profile.role === "admin" ? "Admin Dashboard" : "Client Portal"}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full py-3 px-5 rounded-2xl hover:bg-destructive/10 text-destructive text-sm font-medium transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="py-3 px-5 rounded-2xl text-center text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
                    Sign in
                  </Link>
                  <Link to="/contact" className="btn-dreamy text-center mt-2">
                    Start Free
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
