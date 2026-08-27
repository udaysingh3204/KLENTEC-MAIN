import { Link } from "react-router-dom";
import TeamHeroSection from "@/components/team/TeamHeroSection";
import TeamMembersGrid from "@/components/team/TeamMembersGrid";
import CultureSection from "@/components/team/CultureSection";
import { ArrowRight } from "lucide-react";

const TeamPage = () => {
  const teamMembers = [
    {
      id: "1",
      name: "Uday Singh",
      role: "Founder & Strategy Lead",
      specialty: "Growth Strategy & Business Development",
      bio: "Leads strategy and client growth at KLENTEC, working hands-on with every engagement from first call to launch.",
      yearsExperience: 10,
      social: {
        email: "hello@klentec.com",
      },
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
    <main className="min-h-screen bg-background">
      <TeamHeroSection
        title="Meet The Team Behind KLENTEC"
        subtitle="Our People"
        description="Founder-led, working hands-on with a focused network of specialists to deliver every engagement."
        stats={[
          { label: "Happy Clients", value: "150+" },
          { label: "Avg. ROAS", value: "4.2x" },
          { label: "Years Experience", value: "10+" },
          { label: "Client Retention", value: "95%" },
        ]}
        gradient="from-purple-600 to-pink-600"
      />

      <TeamMembersGrid
        title="Founder"
        subtitle="Working hands-on with a focused network of specialists across strategy, design, and development."
        members={teamMembers}
        columns={1}
      />

      <CultureSection
        title="Our Culture & Values"
        subtitle="What makes KLENTEC different"
        values={values}
      />

      {/* Open Positions Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            We're Hiring!
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            Join our small, talented team and work on high-impact projects with
            real clients.
          </p>
          <Link
            to="/careers"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            View Open Positions
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default TeamPage;
