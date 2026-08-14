import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { BlogCard } from "@/components/BlogCard";

const BlogPreviewSection = () => {
  const featured = blogPosts.slice(0, 3);

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
        >
          <div>
            <span className="badge-dreamy mb-5 inline-block">From the Blog</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground">
              Growth Resources & Insights
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl">
              Expert strategies and lessons from our own client engagements — no fluff, just what's working.
            </p>
          </div>
          <Link
            to="/blog"
            className="btn-ghost inline-flex items-center gap-2 shrink-0 self-start sm:self-auto"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <BlogCard post={post} imageHeight="h-40" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
