import { Link } from "react-router-dom";
import logoWhite from "@/assets/logo-white.png";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => (
  <footer className="border-t border-white/5 bg-background">
    <div className="container mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoWhite} alt="KLENTEC" className="h-7 w-auto" />
        </Link>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-white/5 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} KLENTEC — Building Digital Machines
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
