import TeamHeroSection from "@/components/team/TeamHeroSection";
import JobListingsSection from "@/components/team/JobListingsSection";
import CultureSection from "@/components/team/CultureSection";

const CareersPage = () => {
  const jobListings = [
    {
      id: "1",
      title: "IT Intern",
      department: "IT & Operations",
      location: "Remote",
      type: "Internship" as const,
      level: "Intern" as const,
      description:
        "Support internal tooling, systems, and day-to-day IT operations while learning how a digital agency runs under the hood.",
      requirements: [
        "Basic troubleshooting & networking fundamentals",
        "Comfortable picking up new tools quickly",
        "Currently pursuing or recently completed a degree in IT/CS",
      ],
      nice_to_have: [
        "Familiarity with cloud platforms (AWS/GCP)",
        "Scripting basics (Python or Bash)",
        "Exposure to helpdesk/ticketing tools",
      ],
    },
    {
      id: "2",
      title: "Sales Intern",
      department: "Sales",
      location: "Remote",
      type: "Internship" as const,
      level: "Intern" as const,
      description:
        "Learn the full sales cycle — outreach, qualification, and closing — by working directly on real client pipelines.",
      requirements: [
        "Strong verbal and written communication",
        "Comfortable with outbound outreach and cold calls",
        "Self-motivated and target-driven",
      ],
      nice_to_have: [
        "CRM familiarity (HubSpot, Zoho, etc.)",
        "Prior sales or telecalling experience",
        "Interest in B2B/agency sales",
      ],
    },
    {
      id: "3",
      title: "Marketing Intern",
      department: "Marketing",
      location: "Remote",
      type: "Internship" as const,
      level: "Intern" as const,
      description:
        "Assist with campaign planning, content, and reporting across multiple client accounts — real campaigns, not busywork.",
      requirements: [
        "Basic understanding of digital marketing concepts",
        "Comfortable writing copy and creating content",
        "Detail-oriented and organized",
      ],
      nice_to_have: [
        "Canva or design tool familiarity",
        "Social media management experience",
        "Basic analytics/reporting skills",
      ],
    },
    {
      id: "4",
      title: "SEO Intern",
      department: "Marketing",
      location: "Remote",
      type: "Internship" as const,
      level: "Intern" as const,
      description:
        "Support keyword research, on-page optimization, and reporting for client SEO campaigns.",
      requirements: [
        "Understanding of core SEO concepts",
        "Comfortable with spreadsheets and data",
        "Curious about search algorithms and content strategy",
      ],
      nice_to_have: [
        "Familiarity with SEO tools (Ahrefs, SEMrush, Search Console)",
        "Basic HTML understanding",
        "Content writing experience",
      ],
    },
    {
      id: "5",
      title: "Meta Ads Intern",
      department: "Marketing",
      location: "Remote",
      type: "Internship" as const,
      level: "Intern" as const,
      description:
        "Help plan, launch, and optimize Meta (Facebook & Instagram) ad campaigns for client accounts.",
      requirements: [
        "Interest in paid social advertising",
        "Analytical mindset — comfortable reading performance data",
        "Basic familiarity with Meta Ads Manager",
      ],
      nice_to_have: [
        "Google Ads exposure",
        "Creative/copywriting skills",
        "Meta Blueprint certification (or working toward one)",
      ],
    },
    {
      id: "6",
      title: "Junior Web Developer Intern",
      department: "Engineering",
      location: "Remote",
      type: "Internship" as const,
      level: "Intern" as const,
      description:
        "Work on real client websites and internal tools alongside our development team, shipping actual production code.",
      requirements: [
        "HTML, CSS, and JavaScript fundamentals",
        "Basic understanding of React",
        "Willingness to learn and take feedback",
      ],
      nice_to_have: [
        "Portfolio or GitHub projects",
        "Exposure to TypeScript",
        "Open source contributions",
      ],
    },
    {
      id: "7",
      title: "QA Intern",
      department: "Engineering",
      location: "Remote",
      type: "Internship" as const,
      level: "Intern" as const,
      description:
        "Test client websites and applications for bugs, usability issues, and cross-browser/device inconsistencies before launch.",
      requirements: [
        "Strong attention to detail",
        "Basic understanding of software testing concepts",
        "Clear, structured bug reporting",
      ],
      nice_to_have: [
        "Familiarity with bug-tracking tools (Jira, Linear)",
        "Basic scripting for test automation",
        "Interest in QA/SDET as a career path",
      ],
    },
    {
      id: "8",
      title: "AI/ML Intern",
      department: "AI & Automation",
      location: "Remote",
      type: "Internship" as const,
      level: "Intern" as const,
      description:
        "Help build and evaluate AI-powered automation and workflow tools used across client projects.",
      requirements: [
        "Python fundamentals",
        "Basic understanding of ML/AI concepts",
        "Curiosity about LLMs and applied automation",
      ],
      nice_to_have: [
        "Experience with any ML framework (scikit-learn, PyTorch, etc.)",
        "Prior exposure to LLM APIs (OpenAI, Anthropic, etc.)",
        "Coursework or projects in AI/ML",
      ],
    },
    {
      id: "9",
      title: "Fintech Intern",
      department: "Fintech & Product",
      location: "Remote",
      type: "Internship" as const,
      level: "Intern" as const,
      description:
        "Support research and product work on fintech client projects — payments, billing, and financial dashboards.",
      requirements: [
        "Interest in payments, banking, or financial products",
        "Basic understanding of financial concepts",
        "Strong research and analytical skills",
      ],
      nice_to_have: [
        "Coursework in finance or fintech",
        "Familiarity with payment gateways (Razorpay, Stripe, etc.)",
        "Excel/spreadsheet modeling skills",
      ],
    },
    {
      id: "10",
      title: "Stock Market / Equity Research Intern",
      department: "Finance",
      location: "Remote",
      type: "Internship" as const,
      level: "Intern" as const,
      description:
        "Support market research and financial analysis for internal and client-facing fintech content and tools.",
      requirements: [
        "Genuine interest in equity markets and financial analysis",
        "Comfortable with Excel and financial data",
        "Strong written communication for research summaries",
      ],
      nice_to_have: [
        "Coursework in finance, economics, or commerce",
        "NSE/BSE certification programs",
        "Personal investing/trading experience",
      ],
    },
    {
      id: "11",
      title: "Corporate Law Intern",
      department: "Legal",
      location: "Remote",
      type: "Internship" as const,
      level: "Intern" as const,
      description:
        "Assist with contract review, compliance research, and legal documentation for client agreements and internal operations.",
      requirements: [
        "Currently pursuing a law degree (or recently completed)",
        "Strong research and drafting skills",
        "Attention to detail",
      ],
      nice_to_have: [
        "Exposure to corporate/commercial law",
        "Contract review experience",
        "Interest in tech/startup legal work",
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
      title: "Real Ownership, Not Busywork",
      description: "Interns work on actual client projects from day one, mentored directly by senior team members — not coffee runs.",
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
        title="Internships at KLENTEC"
        subtitle="Careers"
        description="Real client work, not busywork. We're building an internship program across engineering, marketing, AI, fintech, and law — hands-on from day one."
        stats={[
          { label: "Open Internships", value: `${jobListings.length}+` },
          { label: "Remote", value: "100%" },
          { label: "Growth Focused", value: "✓" },
          { label: "Impact Driven", value: "✓" },
        ]}
        showCta={false}
      />

      <JobListingsSection
        title="Open Positions"
        subtitle="Find the role where you'll do your best work"
        jobs={jobListings}
      />

      <CultureSection
        title="Our Culture & Values"
        subtitle="What makes KLENTEC different"
        values={values}
      />

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground mb-4">
              Benefits & Perks
            </h2>
            <p className="text-lg text-muted-foreground">
              We take care of our team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                emoji: "🏠",
                title: "100% Remote",
                description: "Work from anywhere. Flexible hours, no commute.",
              },
              {
                emoji: "🎓",
                title: "Certificate & LOR",
                description: "Internship certificate and a letter of recommendation on successful completion.",
              },
              {
                emoji: "🧑‍🏫",
                title: "Direct Mentorship",
                description: "Work closely with senior team members, not lost in a large cohort.",
              },
              {
                emoji: "📁",
                title: "Real Client Projects",
                description: "Ship work that actually goes live — build a real portfolio, not sample projects.",
              },
              {
                emoji: "🚀",
                title: "Full-Time Track",
                description: "Strong performers are considered first for full-time roles as they open up.",
              },
              {
                emoji: "🕐",
                title: "Flexible Schedule",
                description: "Core hours 11am-3pm IST. Rest is up to you.",
              },
            ].map((perk, i) => (
              <div
                key={i}
                className="card-dreamy p-8 text-center"
              >
                <div className="text-4xl mb-4">{perk.emoji}</div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {perk.title}
                </h3>
                <p className="text-muted-foreground">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process Section */}
      <section className="section-padding">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground text-center mb-16">
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
                  <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br from-[hsl(var(--purple-mid))] to-[hsl(var(--purple-dark))] text-white font-display font-bold">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">
              Interested? Apply now or send us your resume at{" "}
              <a href="mailto:careers@klentec.com" className="text-primary hover:underline">
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
