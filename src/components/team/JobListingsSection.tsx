import { motion } from "framer-motion";
import { MapPin, Briefcase, Users, ArrowRight } from "lucide-react";

interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full Time" | "Part Time" | "Contract" | "Remote";
  level: "Junior" | "Mid" | "Senior" | "Lead";
  description: string;
  requirements: string[];
  nice_to_have?: string[];
}

interface JobListingsSectionProps {
  jobs: JobListing[];
  title?: string;
  subtitle?: string;
  color: string;
}

const CAREERS_EMAIL = "careers@klentec.com";

const applyMailto = (jobTitle: string) =>
  `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Application: ${jobTitle}`)}&body=${encodeURIComponent(
    `Hi KLENTEC team,\n\nI'd like to apply for the ${jobTitle} role.\n\nHere's a bit about me:\n`,
  )}`;

const JobListingsSection = ({
  jobs,
  title = "Open Positions",
  subtitle = "Find the role where you'll do your best work",
  color,
}: JobListingsSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="openings" className="section-padding scroll-mt-28">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              variants={itemVariants}
              whileHover={{ x: 8 }}
              className="card-dreamy p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="w-4 h-4" />
                      {job.department}
                    </span>
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {job.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="badge-pill normal-case tracking-normal">
                    {job.level} Level
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {job.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-3">
                    What we're looking for:
                  </h4>
                  <ul className="space-y-2">
                    {job.requirements.slice(0, 3).map((req, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {job.nice_to_have && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">
                      Nice to have:
                    </h4>
                    <ul className="space-y-2">
                      {job.nice_to_have.slice(0, 3).map((perk, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-muted-foreground/60 mt-1">✦</span>
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/40">
                <span className="text-xs text-muted-foreground">
                  {job.department} · {job.level}
                </span>
                <a
                  href={applyMailto(job.title)}
                  className="btn-nav inline-flex items-center gap-2 text-sm"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {jobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">
              No positions available right now. Check back soon! 👀
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-6">
            Can't find the role you're looking for?
          </p>
          <a href={applyMailto("a role that isn't listed")} className="btn-dreamy inline-flex items-center gap-2">
            Send Us Your CV
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default JobListingsSection;
