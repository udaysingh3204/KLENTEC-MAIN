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
  <footer className="footer-gradient text-white">
    {/* Main footer */}
    <div className="container mx-auto px-6 pt-16 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand column */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src={logoBlack} alt="KLENTEC" className="h-10 w-auto brightness-0 invert" />
          </Link>
          <p className="text-white/70 text-sm leading-relaxed max-w-xs mb-6">
            We build digital machines that scale businesses. Performance marketing, design, and development — all under one roof.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white/80 hover:text-white text-sm">𝕏</a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white/80 hover:text-white text-sm">in</a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white/80 hover:text-white text-sm">ig</a>
          </div>
        </div>

        {/* Link columns */}
        {footerColumns.map((col) => (
          <div key={col.title}>
            <h4 className="font-display font-semibold text-sm mb-4 text-white">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/60 hover:text-white transition-colors"
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

    {/* Bottom bar */}
    <div className="border-t border-white/10">
      <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-white/50">
          © {new Date().getFullYear()} KLENTEC — Building Digital Machines
        </p>
        <div className="flex items-center gap-4 text-sm text-white/50">
          <a href="#" className="hover:text-white/80 transition-colors">Privacy</a>
          <a href="#" className="hover:text-white/80 transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
