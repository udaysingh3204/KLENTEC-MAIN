import { Link } from "react-router-dom";
import logoBlack from "@/assets/logo-black.png";

const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Services", to: "/services" },
      { label: "Work", to: "/work" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Performance Marketing", to: "/services" },
      { label: "Branding & Identity", to: "/services" },
      { label: "Web Development", to: "/services" },
      { label: "AI Automation", to: "/services" },
      { label: "UI/UX Design", to: "/services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Case Studies", to: "/work" },
      { label: "Free Growth Audit", to: "/contact" },
      { label: "FAQ", to: "/#faq" },
    ],
  },
];

const Footer = () => (
  <footer className="footer-clean">
    <div className="container mx-auto px-6 pt-20 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-5">
            <img src={logoBlack} alt="KLENTEC" className="h-16 w-auto" />
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-8">
            We build digital machines that scale businesses. Performance marketing, design, and development — all under one roof.
          </p>
          <div className="flex items-center gap-3">
            {["𝕏", "in", "ig"].map((icon) => (
              <a
                key={icon}
                href="#"
                className="w-10 h-10 rounded-2xl bg-muted hover:bg-accent flex items-center justify-center transition-all duration-300 text-muted-foreground hover:text-accent-foreground text-sm"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {footerColumns.map((col) => (
          <div key={col.title}>
            <h4 className="font-display font-semibold text-sm mb-5 text-foreground">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom */}
    <div className="divider-soft">
      <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} KLENTEC — Building Digital Machines
        </p>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
