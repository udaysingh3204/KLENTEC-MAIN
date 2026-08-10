export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
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
