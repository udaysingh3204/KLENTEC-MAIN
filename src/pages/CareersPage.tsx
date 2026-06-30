import TeamHeroSection from "@/components/team/TeamHeroSection";
import JobListingsSection from "@/components/team/JobListingsSection";
import CultureSection from "@/components/team/CultureSection";

const CareersPage = () => {
  const jobListings = [
    {
      id: "1",
      title: "Senior React Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full Time" as const,
      level: "Senior" as const,
      description:
        "Build beautiful, performant web applications for our clients. You'll own frontend architecture and mentor junior developers.",
      requirements: [
        "5+ years React experience",
        "TypeScript proficiency",
        "Experience with state management (Redux, Zustand, etc.)",
      ],
      nice_to_have: [
        "Experience with Framer Motion or similar animation libraries",
        "Knowledge of Vite or modern bundlers",
        "Open source contributions",
      ],
    },
    {
      id: "2",
      title: "Performance Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full Time" as const,
      level: "Mid" as const,
      description:
        "Manage and optimize PPC campaigns for our clients. Scale successful campaigns and implement new strategies.",
      requirements: [
        "3+ years PPC experience",
        "Google Ads & Facebook Ads expertise",
        "Strong analytical skills",
      ],
      nice_to_have: [
        "LinkedIn Ads experience",
        "CRM knowledge (HubSpot, Salesforce)",
        "Python or SQL for data analysis",
      ],
    },
    {
      id: "3",
      title: "SEO Strategist",
      department: "Marketing",
      location: "Remote",
      type: "Full Time" as const,
      level: "Mid" as const,
      description:
        "Develop and execute SEO strategies for diverse clients. Own organic growth initiatives from planning to execution.",
      requirements: [
        "4+ years SEO experience",
        "Technical SEO knowledge",
        "Content strategy expertise",
      ],
      nice_to_have: [
        "Python scripting for SEO automation",
        "Experience with CMS platforms",
        "Backlink analysis tools proficiency",
      ],
    },
    {
      id: "4",
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full Time" as const,
      level: "Mid" as const,
      description:
        "Design beautiful, intuitive interfaces for web and mobile applications. Lead design from concept through handoff.",
      requirements: [
        "4+ years UX/UI design experience",
        "Figma proficiency",
        "Understanding of design systems",
      ],
      nice_to_have: [
        "Motion design skills",
        "User research experience",
        "Accessibility knowledge (WCAG)",
      ],
    },
    {
      id: "5",
      title: "Account Manager",
      department: "Account Management",
      location: "Remote",
      type: "Full Time" as const,
      level: "Mid" as const,
      description:
        "Manage client relationships and ensure project success. Be the single point of contact for your assigned clients.",
      requirements: [
        "3+ years account management experience",
        "Strong communication skills",
        "Project management experience",
      ],
      nice_to_have: [
        "Agency background",
        "Marketing knowledge",
        "CRM experience",
      ],
    },
    {
      id: "6",
      title: "Junior Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full Time" as const,
      level: "Junior" as const,
      description:
        "Start your career with us. Work on real projects, learn from senior developers, and grow your skills.",
      requirements: [
        "Strong JavaScript/TypeScript fundamentals",
        "React basics or willingness to learn",
        "Problem-solving skills",
      ],
      nice_to_have: [
        "Open source contributions",
        "Portfolio projects on GitHub",
        "Experience with Node.js",
      ],
    },
  ];

  const values = [
    {
      icon: "⚡",
      title: "Ship Fast, Learn Faster",
      description: "We move quickly and reward initiative. We celebrate learning from mistakes and iterate constantly.",
    },
    {
      icon: "👥",
      title: "Small, Senior Team",
      description: "Real ownership from day one. No junior grunts here — everyone is experienced and empowered.",
    },
    {
      icon: "❤️",
      title: "People-First Culture",
      description: "Mentorship, growth, and respect. We invest in our team and celebrate wins together.",
    },
    {
      icon: "🚀",
      title: "Client Success Obsessed",
      description: "We measure ourselves by client ROI. Your success is our success, full stop.",
    },
    {
      icon: "🧠",
      title: "Think Big, Execute Smart",
      description: "Strategic thinking meets pragmatic execution. We're not afraid to challenge the status quo.",
    },
    {
      icon: "🌿",
      title: "Sustainable Growth",
      description: "We don't burn out. Sustainable pace, work-life balance, and long-term thinking.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <TeamHeroSection
        title="Join KLENTEC - We're Hiring"
        subtitle="Careers"
        description="Help us deliver exceptional digital marketing results for 150+ brands. Work with a small, senior team on high-impact projects with real clients."
        stats={[
          { label: "Open Roles", value: "6+" },
          { label: "Remote", value: "100%" },
          { label: "Growth Focused", value: "✓" },
          { label: "Impact Driven", value: "✓" },
        ]}
        gradient="from-green-600 to-emerald-600"
      />

      <JobListingsSection
        title="Open Positions"
        subtitle="Find the role where you'll do your best work"
        jobs={jobListings}
        color="from-green-500 to-emerald-500"
      />

      <CultureSection
        title="Our Culture & Values"
        subtitle="What makes KLENTEC different"
        values={values}
      />

      {/* Benefits Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Benefits & Perks
            </h2>
            <p className="text-lg text-slate-400">
              We take care of our team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                emoji: "🏠",
                title: "100% Remote",
                description: "Work from anywhere. Flexible hours, no commute.",
              },
              {
                emoji: "💰",
                title: "Competitive Salary",
                description: "Industry-standard pay + performance bonuses.",
              },
              {
                emoji: "📚",
                title: "Learning Budget",
                description: "₹50K/year for courses, conferences, and books.",
              },
              {
                emoji: "🏥",
                title: "Health Insurance",
                description: "Comprehensive health, dental, and vision coverage.",
              },
              {
                emoji: "🎯",
                title: "Equity Options",
                description: "Own a piece of KLENTEC. Grow with us.",
              },
              {
                emoji: "🕐",
                title: "Flexible Schedule",
                description: "Core hours 11am-3pm IST. Rest is up to you.",
              },
            ].map((perk, i) => (
              <div
                key={i}
                className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center hover:border-green-500/30 transition"
              >
                <div className="text-4xl mb-4">{perk.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {perk.title}
                </h3>
                <p className="text-slate-400">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process Section */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white text-center mb-16">
            Our Hiring Process
          </h2>

          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Apply",
                description: "Submit your resume and a short note about why you're interested.",
              },
              {
                step: "2",
                title: "Quick Call",
                description: "30-minute conversation to learn about you and answer questions.",
              },
              {
                step: "3",
                title: "Test/Project",
                description: "Small project or assessment relevant to the role.",
              },
              {
                step: "4",
                title: "Interview",
                description: "Meet the team and dive deeper into your experience.",
              },
              {
                step: "5",
                title: "Offer",
                description: "We'll make an offer if we're a good fit both ways.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-br from-green-500 to-emerald-500 text-white font-bold">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-400 mb-6">
              Interested? Apply now or send us your resume at{" "}
              <a href="mailto:careers@klentec.com" className="text-green-400 hover:text-green-300">
                careers@klentec.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CareersPage;
