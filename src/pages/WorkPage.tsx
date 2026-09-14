import { motion } from "framer-motion";
import { ArrowRight, Search, Compass, Hammer, LineChart, Megaphone, Code2, Palette, Zap, Target, Headset, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const process = [
  {
    icon: Search,
    title: "Discover",
    description: "We start by understanding your business, your market, and where the actual bottleneck is — not the one everyone assumes it is.",
  },
  {
    icon: Compass,
    title: "Strategy",
    description: "A clear plan tied to a number that matters — leads, revenue, retention — with the specific channels and tactics to get there.",
  },
  {
    icon: Hammer,
    title: "Build & Launch",
    description: "Design, development, and campaigns get built and shipped — not stuck in endless revision cycles.",
  },
  {
    icon: LineChart,
    title: "Measure & Grow",
    description: "We track what's actually working, cut what isn't, and double down on what moves the number we started with.",
  },
];

const capabilities = [
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "PPC, SEO, and social campaigns built around measurable lead and revenue growth.",
    href: "/services/digital-marketing",
  },
  {
    icon: Code2,
    title: "Web Development",
    description: "Custom web applications and platforms built to scale with your business.",
    href: "/services/web-development",
  },
  {
    icon: Palette,
    title: "Design & Branding",
    description: "Brand identity and design systems built to convert, not just look good.",
    href: "/services/design-branding",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Marketing and operations automation that eliminates manual, repetitive work.",
    href: "/services/automation",
  },
  {
    icon: Target,
    title: "Strategy & Consulting",
    description: "Growth strategy and digital transformation guidance for scaling businesses.",
    href: "/services/strategy",
  },
  {
    icon: Headset,
    title: "Managed Services",
    description: "Ongoing campaign, content, and technical management so you can focus elsewhere.",
    href: "/services/managed-services",
  },
  {
    icon: Rocket,
    title: "24-Hour Web Dev",
    description: "A complete, fixed-scope business website — live in 24 hours.",
    href: "/services/24-hour-web-dev",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const WorkPage = () => {
  return (
    <main>
      <section className="relative gradient-bg-hero pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge-dreamy mb-6 inline-block">How We Work</span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">
              A Process Built Around <span className="gradient-text">Real Outcomes</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              We're building out our public case study library with real client work — check back soon.
              In the meantime, here's exactly how we approach every engagement, and where we can help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding">
        <div className="container mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-foreground">
              Our Process
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <motion.div
                key={step.title}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card-dreamy p-7"
              >
                <div className="icon-dreamy mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-padding gradient-bg-subtle">
        <div className="container mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-foreground">
              Where We Can Help
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Pick the area closest to your current bottleneck — or talk to us if you're not sure which one it is.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link to={cap.href} className="card-dreamy p-7 block h-full group">
                  <div className="icon-dreamy mb-4">
                    <cap.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">{cap.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{cap.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Let's Build Something <span className="gradient-text">Real</span>
            </h2>
            <Link to="/contact" className="btn-primary-gradient inline-block mt-8 px-10 py-4 text-base">
              Book a Call
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default WorkPage;
