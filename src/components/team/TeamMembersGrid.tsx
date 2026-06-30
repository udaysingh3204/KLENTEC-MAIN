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
  columns?: 1 | 2 | 3 | 4;
}

const TeamMembersGrid = ({
  members,
  title = "Meet Our Team",
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
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {title}
            </h2>
            <p className="text-lg text-slate-400">
              Talented individuals working together to deliver exceptional results.
            </p>
          </motion.div>
        )}

        <motion.div
          className={`grid grid-cols-1 ${gridColsClass[columns]} gap-8`}
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
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition group"
            >
              {/* Image placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-purple-500 via-pink-500 to-slate-700 flex items-center justify-center overflow-hidden">
                <div className="text-6xl font-bold text-white/20 group-hover:scale-110 transition">
                  {member.name.charAt(0)}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-purple-400 font-semibold text-sm mb-1">
                  {member.role}
                </p>
                <p className="text-slate-400 text-sm mb-3">
                  {member.specialty}
                </p>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  {member.yearsExperience}+ years experience
                </div>

                {/* Social links */}
                {member.social && (
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-blue-400 transition"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="text-slate-400 hover:text-purple-400 transition"
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
                        className="text-slate-400 hover:text-slate-200 transition"
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
