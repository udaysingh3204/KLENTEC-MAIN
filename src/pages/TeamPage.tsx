import TeamHeroSection from "@/components/team/TeamHeroSection";
import TeamMembersGrid from "@/components/team/TeamMembersGrid";
import CultureSection from "@/components/team/CultureSection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const TeamPage = () => {
  const teamMembers = [
    {
      id: "1",
      name: "Uday Singh",
      role: "Founder & Strategy Lead",
      specialty: "Growth Strategy & Business Development",
      bio: "10+ years building successful digital strategies for 150+ brands. Led growth from 0 to $5M ARR.",
      yearsExperience: 10,
      social: {
        linkedin: "https://linkedin.com",
        email: "uday@klentec.com",
      },
    },
    {
      id: "2",
      name: "Sarah Chen",
      role: "Director, Digital Marketing",
      specialty: "PPC & Performance Marketing",
      bio: "Expert in scaling ad campaigns. Specializes in Google Ads, Facebook, and LinkedIn. 8+ years experience.",
      yearsExperience: 8,
      social: {
        linkedin: "https://linkedin.com",
        email: "sarah@klentec.com",
      },
    },
    {
      id: "3",
      name: "Raj Patel",
      role: "Tech Lead",
      specialty: "Web Development & Infrastructure",
      bio: "Full-stack developer with 12 years experience. Specializes in React, Node.js, and cloud architecture.",
      yearsExperience: 12,
      social: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        email: "raj@klentec.com",
      },
    },
    {
      id: "4",
      name: "Maya Desai",
      role: "Creative Director",
      specialty: "Brand Design & UX/UI",
      bio: "Award-winning designer. Created 100+ brand identities and designed interfaces for 50+ products.",
      yearsExperience: 9,
      social: {
        linkedin: "https://linkedin.com",
        email: "maya@klentec.com",
      },
    },
    {
      id: "5",
      name: "Alex Rodriguez",
      role: "SEO Strategist",
      specialty: "Organic Growth & Content",
      bio: "Helped 80+ clients achieve top-3 rankings. 6+ years of SEO expertise across diverse industries.",
      yearsExperience: 6,
      social: {
        linkedin: "https://linkedin.com",
        email: "alex@klentec.com",
      },
    },
    {
      id: "6",
      name: "Priya Sharma",
      role: "Account Manager",
      specialty: "Client Success & Strategy",
      bio: "Manages relationships with enterprise clients. 7 years of account management and consulting.",
      yearsExperience: 7,
      social: {
        linkedin: "https://linkedin.com",
        email: "priya@klentec.com",
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
    <main className="min-h-screen bg-slate-950">
      <TeamHeroSection
        title="Meet The Team Behind KLENTEC"
        subtitle="Our People"
        description="A small team of senior strategists, designers, and developers obsessed with delivering exceptional results for our clients. Each team member brings 6-12 years of specialized expertise."
        stats={[
          { label: "Team Size", value: "6+" },
          { label: "Avg Experience", value: "8.5yr" },
          { label: "Clients Served", value: "150+" },
          { label: "Combined Experience", value: "50yr+" },
        ]}
        gradient="from-purple-600 to-pink-600"
      />

      <TeamMembersGrid
        title="Our Team Leaders"
        members={teamMembers}
        columns={3}
      />

      <CultureSection
        title="Our Culture & Values"
        subtitle="What makes KLENTEC different"
        values={values}
      />

      {/* Why Join Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Why Work With Us
            </h2>
            <p className="text-lg text-slate-400">
              What our team members say about KLENTEC
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Real ownership from day one. I'm not just executing, I'm strategizing and making decisions.",
                author: "Sarah Chen",
                role: "Digital Marketing Director",
              },
              {
                quote:
                  "The team genuinely cares about each other's growth. We invest in learning and development.",
                author: "Raj Patel",
                role: "Tech Lead",
              },
              {
                quote:
                  "Working with clients who actually care about results makes all the difference.",
                author: "Priya Sharma",
                role: "Account Manager",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-slate-800 border border-slate-700 rounded-lg p-8"
              >
                <p className="text-slate-300 text-lg mb-6 italic">
                  "{item.quote}"
                </p>
                <div>
                  <p className="font-semibold text-white">{item.author}</p>
                  <p className="text-sm text-slate-400">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            We're Hiring!
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            Join our small, talented team and work on high-impact projects with
            real clients.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            View Open Positions
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </main>
  );
};

export default TeamPage;
