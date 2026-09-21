import { Link } from "react-router-dom";
import TeamHeroSection from "@/components/team/TeamHeroSection";
import TeamMembersGrid from "@/components/team/TeamMembersGrid";
import CultureSection from "@/components/team/CultureSection";
import { ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";

const TeamPage = () => {
  const teamMembers = [
    {
      id: "1",
      name: "Uday Singh",
      role: "Founder",
      specialty: "Project Management, Backend & Frontend",
      bio: "Hands-on across project management, backend, and frontend since founding KLENTEC — including Middle East projects such as Emaar and similar developments.",
      yearsExperience: 5,
      social: {
        email: "hello@klentec.com",
      },
    },
    {
      id: "2",
      name: "Vipul Kumar Singh",
      role: "Co-Founder",
      specialty: "Project Management",
      bio: "Over nine years of project management experience, having worked with clients across the United States and globally.",
      yearsExperience: 9,
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
      <SEO
        title="Our Team"
        description="Meet the people building KLENTEC's growth systems, design, and development work."
        path="/team"
      />
      <TeamHeroSection
        title="Meet The Team Behind KLENTEC"
        subtitle="Our People"
        description="Founder-led, working hands-on with a focused network of specialists to deliver every engagement."
      />

      <TeamMembersGrid
        title="Founders"
        subtitle="Working hands-on alongside WordPress developers, designers, and DevOps engineers to deliver every engagement."
        members={teamMembers}
        columns={2}
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
