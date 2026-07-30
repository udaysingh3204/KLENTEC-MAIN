import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter, Github, ArrowRight } from "lucide-react";

const footerSections = [
  {
    title: "Company",
    links: [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Work", to: "/work" },
      { label: "Contact", to: "/contact" },
      { label: "Careers", to: "/careers" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Digital Marketing", to: "/services/digital-marketing" },
      { label: "Web Development", to: "/services/web-development" },
      { label: "Design & Branding", to: "/services/design-branding" },
      { label: "24-Hour Web Dev", to: "/services/24-hour-web-dev" },
      { label: "AI Automation", to: "/services/automation" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", to: "/blog" },
      { label: "Testimonials", to: "/testimonials" },
      { label: "Case Studies", to: "/work" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms & Conditions", to: "/terms" },
      { label: "Security", to: "#" },
    ],
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://linkedin.com/company/klentec",
    label: "LinkedIn",
    color: "hover:text-blue-500",
  },
  {
    icon: Instagram,
    href: "https://instagram.com/klentec.in",
    label: "Instagram",
    color: "hover:text-pink-500",
  },
  // {
  //   icon: Twitter,
  //   href: "https://twitter.com/klentec",
  //   label: "Twitter",
  //   color: "hover:text-sky-500",
  // },
  // {
  //   icon: Github,
  //   href: "https://github.com/klentec",
  //   label: "GitHub",
  //   color: "hover:text-slate-400",
  // },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@klentec.com",
    href: "mailto:hello@klentec.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9557 630336",
    href: "tel:+919557630336",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Noida, Uttar Pradesh, India",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link to="/">
              <h3 className="text-2xl font-bold text-white mb-3">KLENTEC</h3>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Building digital machines that scale businesses. Performance marketing, design, and development — all under one roof.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href || "#"}
                    className="flex items-center gap-3 text-slate-400 hover:text-purple-400 transition-colors group"
                  >
                    <Icon size={18} className="flex-shrink-0" />
                    <div>
                      <div className="text-xs text-slate-500">{item.label}</div>
                      <div className="text-sm font-medium text-slate-300 group-hover:text-purple-400">
                        {item.value}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Footer Links Grid */}
          {footerSections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-400 hover:text-purple-400 transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowRight
                        size={14}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Copyright */}
            <div className="text-sm text-slate-500">
              <p>© {currentYear} KLENTEC — Building Digital Machines</p>
            </div>

            {/* Center: Stats */}
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="font-bold text-white">150+</div>
                <div className="text-slate-500 text-xs">Happy Clients</div>
              </div>
              <div className="w-px h-6 bg-slate-800"></div>
              <div className="text-center">
                <div className="font-bold text-white">4.2x</div>
                <div className="text-slate-500 text-xs">Avg. ROAS</div>
              </div>
              <div className="w-px h-6 bg-slate-800"></div>
              <div className="text-center">
                <div className="font-bold text-white">10yr+</div>
                <div className="text-slate-500 text-xs">Experience</div>
              </div>
            </div>

            {/* Right: Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-slate-500 transition-colors ${social.color}`}
                    aria-label={social.label}
                    title={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-t border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-slate-400">
          Made with ❤️ in India | Serving clients globally
        </div>
      </div>
    </footer>
  );
};

export default Footer;
