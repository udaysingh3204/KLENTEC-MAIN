import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

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
              <Link to="/blog" className="card-dreamy overflow-hidden cursor-pointer group block h-full">
                <div
                  className="h-40 flex items-center justify-center text-4xl"
                  style={{ background: "linear-gradient(135deg, hsl(var(--purple-soft)), hsl(260 80% 94%))" }}
                >
                  {post.image}
                </div>

                <div className="p-6">
                  <span className="badge-pill mb-3 inline-block normal-case tracking-normal">
                    {post.category}
                  </span>

                  <h3 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/40">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
