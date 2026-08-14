import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import type { BlogPost } from "@/data/blogPosts";

export const BlogCard = ({ post, imageHeight = "h-44" }: { post: BlogPost; imageHeight?: string }) => (
  <Link to={`/blog/${post.slug}`} className="card-dreamy overflow-hidden cursor-pointer group block h-full">
    <div
      className={`${imageHeight} flex items-center justify-center text-5xl`}
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

      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border/40">
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {post.date}
        </span>
        <span>{post.readTime}</span>
      </div>
    </div>
  </Link>
);
