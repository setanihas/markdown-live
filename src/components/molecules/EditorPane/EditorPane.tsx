import { useRef, useCallback } from "react";
import s from "./EditorPane.module.css";

interface Props { value: string; onChange: (v: string) => void; }

const WRAP: Record<string, [string, string]> = {
  b: ["**", "**"], i: ["_", "_"], k: ["`", "`"],
};

export function EditorPane({ value, onChange }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const ta = ref.current;
    if (!ta) return;
    const { selectionStart: ss, selectionEnd: se } = ta;

    if (e.key === "Tab") {
      e.preventDefault();
      const next = value.slice(0, ss) + "  " + value.slice(se);
      onChange(next);
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = ss + 2; });
      return;
    }

    if ((e.metaKey || e.ctrlKey) && !e.shiftKey) {
      const wrap = WRAP[e.key];
      if (wrap) {
        e.preventDefault();
        const [before, after] = wrap;
        const sel = value.slice(ss, se);
        onChange(value.slice(0, ss) + before + sel + after + value.slice(se));
        requestAnimationFrame(() => {
          ta.selectionStart = ss + before.length;
          ta.selectionEnd   = se + before.length;
        });
      }
    }
  }, [value, onChange]);

  return (
    <div className={s.pane}>
      <div className={s.header}>
        <span className={s.label}>
          <EditIcon /> Markdown
        </span>
        <div className={s.hints}>
          <Kbd>⌘B</Kbd>bold <Kbd>⌘I</Kbd>italic <Kbd>⌘K</Kbd>code <Kbd>Tab</Kbd>indent
        </div>
      </div>
      <div className={s.wrap}>
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className={s.textarea}
          spellCheck={false}
          autoCapitalize="none"
          autoCorrect="off"
          placeholder="Start writing Markdown…"
          aria-label="Markdown editor"
        />
      </div>
    </div>
  );
}

function EditIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd style={{
    display: "inline-flex", alignItems: "center",
    padding: "1px 5px",
    background: "var(--surface-card)", border: "1px solid var(--border-2)",
    borderRadius: 3, fontFamily: "var(--font-mono)", fontSize: 10,
    color: "var(--text-2)", marginRight: 3,
  }}>{children}</kbd>;
}
