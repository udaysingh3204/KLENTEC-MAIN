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
  <footer className="bg-slate-950 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-5">
            <img src={logoBlack} alt="KLENTEC" className="h-10 w-auto" />
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
            We build digital machines that scale businesses. Performance marketing, design, and development — all under one roof.
          </p>
          <div className="flex items-center gap-3">
            {[
              { label: "Twitter", url: "#" },
              { label: "LinkedIn", url: "#" },
              { label: "Instagram", url: "#" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.url}
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors text-slate-400 hover:text-white"
              >
                {social.label.charAt(0)}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {footerColumns.map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold text-white text-sm mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-slate-800" />

      {/* Bottom */}
      <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} KLENTEC — Building Digital Machines
        </p>
        <div className="flex items-center gap-6 text-sm">
          <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
