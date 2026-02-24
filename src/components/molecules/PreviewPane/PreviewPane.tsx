import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";
import s from "./PreviewPane.module.css";

interface Props { content: string; }

export function PreviewPane({ content }: Props) {
  return (
    <div className={s.pane}>
      <div className={s.header}>
        <span className={s.label}>
          <EyeIcon /> Preview
        </span>
        <span className={s.live}><span className={s.dot} />Live</span>
      </div>
      <div className={s.scroll}>
        <div className={s.content}>
          {content.trim() === "" ? (
            <div className={s.empty}>
              <FileIcon />
              <p>Your preview will appear here.<br />Start writing in the editor.</p>
            </div>
          ) : (
            <ReactMarkdown
              className="md-preview"
              remarkPlugins={[remarkGfm, remarkBreaks]}
              rehypePlugins={[
                rehypeHighlight,
                rehypeSlug,
                [rehypeAutoLinkHeadings, { behavior: "wrap", properties: { className: ["anchor"] } }],
              ]}
            >
              {content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  );
}
