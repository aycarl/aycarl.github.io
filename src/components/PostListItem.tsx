import { Link } from "react-router-dom";
import type { Post } from "@/lib/craft";

const dotColors = ["bg-sky", "bg-green", "bg-yellow", "bg-pink", "bg-orange"];

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

type PostListItemProps = {
  post: Post;
  activeTag?: string;
};

export const PostListItem = ({ post, activeTag }: PostListItemProps) => (
  <li>
    <Link
      to={`/writing/${post.slug}`}
      className="group grid grid-cols-12 gap-6 py-8 items-baseline hover:bg-secondary/40 -mx-4 px-4 rounded-lg transition-colors"
    >
      <div className="col-span-12 md:col-span-3 text-sm text-muted-foreground tabular-nums">
        {post.date && formatDate(post.date)}
        <div className="text-xs text-muted-foreground/70 mt-1">{post.readingTime} min read</div>
      </div>
      <div className="col-span-12 md:col-span-9">
        <h3 className="text-2xl md:text-3xl font-light tracking-tight group-hover:text-foreground/70 transition-colors">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-3 text-foreground/65 leading-relaxed line-clamp-2">{post.excerpt}</p>
        )}
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {post.tags.slice(0, 4).map((t, i) => (
              <Link
                key={t}
                to={`/writing/tag/${encodeURIComponent(t)}`}
                onClick={(e) => e.stopPropagation()}
                className={`inline-flex items-center gap-1.5 text-xs hover:text-foreground transition-colors ${
                  activeTag && t.toLowerCase() === activeTag.toLowerCase()
                    ? "text-foreground"
                    : "text-foreground/55"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${dotColors[i % 5]}`} />
                {t}
              </Link>
            ))}
          </div>
        )}
      </div>
    </Link>
  </li>
);
