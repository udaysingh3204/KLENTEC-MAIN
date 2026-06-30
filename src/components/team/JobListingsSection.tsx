import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Job listings */}
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
              className={`relative rounded-lg p-6 sm:p-8 border border-slate-800 hover:border-slate-700 transition bg-gradient-to-r from-slate-800/50 to-transparent group cursor-pointer`}
            >
              {/* Top row: Title, Location, Type */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="flex items-center gap-2 text-slate-400">
                      <Briefcase className="w-4 h-4" />
                      {job.department}
                    </span>
                    <span className="flex items-center gap-2 text-slate-400">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-2 text-slate-400">
                      <Users className="w-4 h-4" />
                      {job.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    job.level === "Senior" || job.level === "Lead"
                      ? "bg-purple-500/20 text-purple-400"
                      : job.level === "Mid"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-green-500/20 text-green-400"
                  }`}>
                    {job.level} Level
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {job.description}
              </p>

              {/* Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3 text-purple-400">
                    What we're looking for:
                  </h4>
                  <ul className="space-y-2">
                    {job.requirements.slice(0, 3).map((req, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-purple-400 mt-1">✓</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {job.nice_to_have && (
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3 text-slate-400">
                      Nice to have:
                    </h4>
                    <ul className="space-y-2">
                      {job.nice_to_have.slice(0, 3).map((perk, i) => (
                        <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                          <span className="text-slate-500 mt-1">✦</span>
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <span className="text-xs text-slate-500">
                  Posted on {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                <Button
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white group/btn"
                >
                  View Details
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No jobs */}
        {jobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-slate-400 text-lg">
              No positions available right now. Check back soon! 👀
            </p>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-slate-400 mb-6">
            Can't find the role you're looking for?
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            Send Us Your CV
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default JobListingsSection;
