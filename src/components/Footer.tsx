import { Link } from "react-router-dom";
import logoBlack from "@/assets/logo-black.png";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => (
  <footer className="border-t border-border bg-secondary/50">
    <div className="container mx-auto px-6 py-14">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoBlack} alt="KLENTEC" className="h-7 w-auto" />
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
      <div className="mt-10 pt-6 divider-subtle text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} KLENTEC — Building Digital Machines
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
