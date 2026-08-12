import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Instagram, ArrowRight } from "lucide-react";

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
  },
  {
    icon: Instagram,
    href: "https://instagram.com/klentec.in",
    label: "Instagram",
  },
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
    <footer className="footer-clean">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link to="/">
              <h3 className="text-2xl font-display font-bold text-foreground mb-3">KLENTEC</h3>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
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
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <Icon size={18} className="flex-shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground/70">{item.label}</div>
                      <div className="text-sm font-medium text-foreground/90 group-hover:text-primary">
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
              <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
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
        <div className="divider-soft py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Copyright */}
            <div className="text-sm text-muted-foreground/70">
              <p>© {currentYear} KLENTEC — Building Digital Machines</p>
            </div>

            {/* Center: Stats */}
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="font-display font-bold text-foreground">150+</div>
                <div className="text-muted-foreground/70 text-xs">Happy Clients</div>
              </div>
              <div className="w-px h-6 bg-border/40"></div>
              <div className="text-center">
                <div className="font-display font-bold text-foreground">4.2x</div>
                <div className="text-muted-foreground/70 text-xs">Avg. ROAS</div>
              </div>
              <div className="w-px h-6 bg-border/40"></div>
              <div className="text-center">
                <div className="font-display font-bold text-foreground">10yr+</div>
                <div className="text-muted-foreground/70 text-xs">Experience</div>
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
                    className="text-muted-foreground/70 hover:text-primary transition-colors"
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
      <div className="gradient-bg-subtle border-t border-border/30 px-6 py-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          Made with ❤️ in India | Serving clients globally
        </div>
      </div>
    </footer>
  );
};

export default Footer;
