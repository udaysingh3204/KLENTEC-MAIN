import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  image?: string;
  social?: {
    linkedin?: string;
    email?: string;
    github?: string;
  };
  yearsExperience: number;
}

interface TeamMembersGridProps {
  members: TeamMember[];
  title?: string;
  subtitle?: string;
  columns?: 1 | 2 | 3 | 4;
}

const TeamMembersGrid = ({
  members,
  title = "Meet Our Team",
  subtitle = "Senior specialists in strategy, design, and development — not generalists learning on your dime.",
  columns = 3,
}: TeamMembersGridProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const gridColsClass = {
    1: "grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          </motion.div>
        )}

        <motion.div
          className={`grid grid-cols-1 ${gridColsClass[columns]} gap-8 ${columns === 1 ? "max-w-md mx-auto" : ""}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {members.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="card-dreamy overflow-hidden group"
            >
              <div
                className="relative h-48 flex items-center justify-center overflow-hidden"
                style={{ background: "linear-gradient(135deg, hsl(var(--purple-soft)), hsl(260 80% 94%))" }}
              >
                <div className="text-6xl font-display font-bold text-primary/30 group-hover:scale-110 transition">
                  {member.name.charAt(0)}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-semibold text-sm mb-1">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm mb-3">
                  {member.specialty}
                </p>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  {member.yearsExperience}+ years experience
                </div>

                {member.social && (
                  <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="text-muted-foreground hover:text-primary transition"
                        title="Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition"
                        title="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamMembersGrid;
