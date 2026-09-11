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
      title: "Real Ownership, Not Busywork",
      description: "From founder to intern, everyone works directly on real client outcomes — not make-work.",
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
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground mb-6">
            We're Hiring!
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join our small, talented team and work on high-impact projects with
            real clients.
          </p>
          <Link to="/careers" className="btn-dreamy inline-flex items-center gap-2">
            View Open Positions
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default TeamPage;
