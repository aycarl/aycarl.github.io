import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Link } from "react-router-dom";
import { resolveHref } from "@/lib/urls";

const MarkdownLink: Components["a"] = ({ node: _node, href, children, ...rest }) => {
  const link = resolveHref(href);
  if (link.kind === "internal") {
    return (
      <Link to={link.href} {...rest}>
        {children}
      </Link>
    );
  }
  if (link.kind === "external") {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <a href={link.href || undefined} {...rest}>
      {children}
    </a>
  );
};

export const Markdown = ({ children }: { children: string }) => {
  return (
    <div className="prose-aycarl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{ a: MarkdownLink }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};
