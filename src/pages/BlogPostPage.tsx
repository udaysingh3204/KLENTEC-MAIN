import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { BlogCard } from "@/components/BlogCard";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative pt-40 pb-16 section-padding">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to all articles
            </Link>

            <span className="badge-pill mb-5 inline-block normal-case tracking-normal">
              {post.category}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mt-6">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover */}
      <section className="section-padding pt-0 pb-0">
        <div className="container mx-auto max-w-3xl">
          <div
            className="h-56 sm:h-72 rounded-3xl flex items-center justify-center text-7xl"
            style={{ background: "linear-gradient(135deg, hsl(var(--purple-soft)), hsl(260 80% 94%))" }}
          >
            {post.image}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section-padding">
        <div className="container mx-auto max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground leading-relaxed mb-10"
          >
            {post.excerpt}
          </motion.p>

          <div className="space-y-10">
            {post.sections.map((section, i) => (
              <motion.div
                key={section.heading}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground mb-3">
                  {section.heading}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {section.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-dreamy p-8 sm:p-10 text-center mt-16"
          >
            <h3 className="text-2xl font-display font-bold text-foreground mb-3">
              Want this applied to your business?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Book a free strategy call and we'll show you exactly where these ideas fit into your growth plan.
            </p>
            <Link to="/contact" className="btn-dreamy inline-flex items-center gap-2">
              Book Free Strategy Call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="section-padding pt-0">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-foreground mb-8">
              More Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} imageHeight="h-40" />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogPostPage;
