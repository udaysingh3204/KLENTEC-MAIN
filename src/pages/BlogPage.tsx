import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "How to Achieve 4.2x ROAS on Your Ad Campaigns",
      excerpt: "Learn the proven strategies we use to help clients consistently achieve 4.2x return on ad spend.",
      category: "Digital Marketing",
      author: "Sarah Chen",
      date: "June 28, 2026",
      readTime: "8 min read",
      image: "🎯",
    },
    {
      id: 2,
      title: "Web Development Trends 2026: What You Need to Know",
      excerpt: "Discover the latest technologies and patterns that are shaping modern web development.",
      category: "Web Development",
      author: "Raj Patel",
      date: "June 25, 2026",
      readTime: "12 min read",
      image: "🚀",
    },
    {
      id: 3,
      title: "Brand Identity That Converts: A Complete Guide",
      excerpt: "Your brand is more than a logo. Learn how to create a complete identity system that drives conversions.",
      category: "Design & Branding",
      author: "Maya Desai",
      date: "June 22, 2026",
      readTime: "10 min read",
      image: "🎨",
    },
    {
      id: 4,
      title: "Automation Workflows That Save 40+ Hours Weekly",
      excerpt: "See how to eliminate repetitive tasks and scale your business without hiring more people.",
      category: "Automation",
      author: "Uday Singh",
      date: "June 20, 2026",
      readTime: "9 min read",
      image: "⚡",
    },
    {
      id: 5,
      title: "Digital Transformation Strategy for 2026",
      excerpt: "A comprehensive guide to modernizing your business operations and staying competitive.",
      category: "Strategy",
      author: "Priya Sharma",
      date: "June 18, 2026",
      readTime: "15 min read",
      image: "📊",
    },
    {
      id: 6,
      title: "Building a Sustainable Growth Engine",
      excerpt: "Learn how to create systems that generate consistent, scalable revenue growth.",
      category: "Business",
      author: "Alex Rodriguez",
      date: "June 15, 2026",
      readTime: "11 min read",
      image: "📈",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-950 via-purple-900/20 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Growth Resources & Insights
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
              Expert insights, strategies, and tactics to help you grow your digital presence and revenue.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-slate-600 transition group cursor-pointer"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-6xl">
                  {post.image}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category */}
                  <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-semibold mb-3">
                    {post.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 pb-4 border-b border-slate-700">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Author & CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      by <span className="text-slate-300 font-semibold">{post.author}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Get Growth Insights Weekly
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              Subscribe to our newsletter and get actionable strategies delivered to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="your@email.com"
                className="px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
              />
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                Subscribe
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
