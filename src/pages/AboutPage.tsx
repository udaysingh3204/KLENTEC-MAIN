import { motion } from "framer-motion";
import { Crosshair, Eye, Zap, Users, Award, Target } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const timeline = [
  { year: "2022", title: "Founded by Frustrated Founders", desc: "KLENTEC started when our team grew tired of agencies that talked big but delivered small. We decided to build something different — a growth partner obsessed with client results, not billable hours. First client generated 240% lead growth in 90 days." },
  { year: "2023", title: "Scaled from 3 to 15 People", desc: "After early success, we expanded our team strategically. Delivered 80+ projects across SaaS, e-commerce, and services. Hit $2M+ in verified client revenue generation. Built our proprietary growth framework." },
  { year: "2024", title: "AI Automation Era", desc: "Integrated AI across our operations: automated funnel analysis, predictive conversion optimization, content generation, and strategy recommendations. Clients started seeing results 50% faster. Now managing 150+ active client accounts." },
  { year: "2025", title: "Global Growth Partner Status", desc: "Working with ambitious brands across US, EU, Asia-Pacific regions. Achieved 95% client retention rate. Pioneered results-based pricing model. 8+ industries, from fintech to healthcare. On track for $5M+ in client revenue impact this year." },
];

const team = [
  { name: "Uday Singh", role: "Founder & Growth Strategist", bio: "12+ years in digital marketing and growth. Built multiple 6-figure businesses from scratch. Obsessed with data-driven strategies and revenue impact.", expertise: ["Growth Strategy", "Product Scaling", "Revenue Optimization"] },
  { name: "Alex Chen", role: "Head of Development", bio: "Full-stack engineer with 8+ years experience. Previously led tech at a venture-backed SaaS. Builds systems that scale with your business.", expertise: ["Full-Stack Development", "System Architecture", "Performance"] },
  { name: "Sarah Martinez", role: "Marketing & Funnel Specialist", bio: "Former CMO at 3 successful startups. Expert in funnel optimization, conversion psychology, and customer acquisition. Loves turning browsers into buyers.", expertise: ["Funnel Optimization", "CRO", "Content Strategy"] },
  { name: "James Park", role: "AI & Automation Lead", bio: "AI researcher turned practitioner. Implements cutting-edge automation that reduces manual work by 60-80%. Passionate about sustainable growth systems.", expertise: ["AI Integration", "Marketing Automation", "Process Optimization"] },
  { name: "Emma Thompson", role: "Design & Brand Director", bio: "Award-winning designer with 10+ years in SaaS and e-commerce. Believes great design is invisible because it just works. Designs for conversions, not awards.", expertise: ["Brand Strategy", "UI/UX Design", "Design Systems"] },
  { name: "Michael Rodriguez", role: "Account Management & Ops", bio: "Customer success obsessed. Previously scaled support at a 100-person company. Ensures every client feels like a partner, not a number.", expertise: ["Client Success", "Project Management", "Operations"] },
];

const AboutPage = () => (
  <main>
    <section className="relative gradient-bg-hero pt-32 pb-20">
      <div className="container mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="badge-dreamy mb-6 inline-block">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">
            We Were Tired of <span className="gradient-text">Broken Promises</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Most agencies talk growth. We deliver it. Our founding team built this because we got tired of watching agencies optimize for billable hours instead of client results. Now we're obsessed with one thing: your revenue.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <motion.div {...fadeUp} className="space-y-8 text-lg text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">The KLENTEC Origin Story</h2>
            <p>In 2022, our founder Uday was running a SaaS company getting crushed by broken marketing systems. He hired three different agencies over 18 months. All promised growth. None delivered. The first focused on vanity metrics, the second disappeared after 60 days, and the third was just expensive with no results.</p>
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Then Something Changed</h2>
            <p>Instead of blaming the agencies, Uday decided to build the agency he needed. He brought together experts: a phenomenal developer, a growth hacker who'd scaled three startups, a designer obsessed with conversions, and an AI specialist. Together, they created KLENTEC — not as a traditional agency, but as a growth partner.</p>
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Why We're Different</h2>
            <p>We don't optimize for billable hours. We optimize for client revenue. We don't do "design for design's sake" or "marketing for marketing's sake." Everything we build connects to revenue. Every member of our team is obsessed with measurable results. And we structure our fees so we only win when you win.</p>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="section-padding gradient-bg-subtle">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: Crosshair, title: "Mission", desc: "To help ambitious brands scale using powerful digital systems." },
            { icon: Eye, title: "Vision", desc: "To become a global growth partner for startups and modern businesses." },
            { icon: Zap, title: "Approach", desc: "We don't believe in guesswork. We test, optimize, and scale what works." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-elevated p-8 text-center"
            >
              <div className="icon-box-lg mx-auto mb-5">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-display font-bold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container mx-auto max-w-2xl">
        <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-display font-bold text-center mb-14">
          Our <span className="gradient-text">Journey</span>
        </motion.h2>
        <div className="relative">
          <div className="absolute left-[15px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />
          {timeline.map((t, i) => (
            <motion.div
              key={t.year}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative flex items-start gap-6 mb-10 pl-10 md:pl-0"
            >
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 w-[30px] h-[30px] rounded-full bg-background border-2 border-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div className="md:ml-[calc(50%+24px)]">
                <p className="text-xs text-primary font-bold">{t.year}</p>
                <h3 className="text-base font-display font-bold text-foreground">{t.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding gradient-bg-subtle">
      <div className="container mx-auto">
        <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-display font-bold text-center mb-14">
          Meet the <span className="gradient-text">Team</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-elevated p-8"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-display font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-sm text-primary font-semibold mb-3">{member.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{member.bio}</p>
              <div className="pt-5 border-t border-border">
                <p className="text-xs text-foreground font-semibold mb-2">Expertise:</p>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((exp) => (
                    <span key={exp} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container mx-auto max-w-2xl">
        <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-display font-bold text-center mb-14">
          By the Numbers
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {[
            { label: "Client Revenue Generated", value: "$50M+" },
            { label: "Projects Delivered", value: "250+" },
            { label: "Team Members", value: "15+" },
            { label: "Client Retention Rate", value: "95%" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card-dreamy p-8 text-center"
            >
              <p className="text-4xl md:text-5xl font-display font-bold gradient-text mb-3">{stat.value}</p>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding gradient-bg-subtle">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {[
            { icon: Target, title: "Our Commitment", desc: "Every client interaction is guided by one principle: we only succeed when you succeed. Your revenue is our revenue." },
            { icon: Award, title: "Our Approach", desc: "We combine data science, psychology, and creativity. We test everything, measure relentlessly, and scale what works." },
            { icon: Zap, title: "Our Obsession", desc: "Growth systems that are sustainable, predictable, and scalable. We build for the long game, not quick wins." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-elevated p-8 text-center"
            >
              <div className="icon-box-lg mx-auto mb-5">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-display font-bold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container mx-auto text-center">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Let's Build <span className="gradient-text">Your Growth Machine</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            We're not just an agency. We're a growth partner obsessed with your success. Whether you're a 5-person startup or a 500-person company, if you want to dominate your market, let's talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact" className="btn-primary-gradient px-10 py-4 text-base">
              🚀 Let's Start Growing
            </Link>
            <Link to="/services" className="btn-secondary-outline px-10 py-4 text-base">
              Explore Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </main>
);

export default AboutPage;
