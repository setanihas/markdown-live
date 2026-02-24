import { useState, useCallback } from "react";
import { useDebounce } from "use-debounce";

const KEY = "md-content";

const DEFAULT = `# Welcome to MarkdownLive ✦

A **production-grade** live markdown editor with _real-time_ preview.

## Features

- ⚡ Live preview with debounced rendering
- 🎨 Dark / light theme toggle  
- 🔤 GFM — tables, task lists, strikethrough  
- 💾 Auto-save to localStorage  
- ⬇️ Download as \`.md\`  
- ⌨️ Keyboard shortcuts: \`⌘B\` bold · \`⌘I\` italic · \`⌘K\` code · \`Tab\` indent

---

## Code Highlighting

\`\`\`typescript
interface EditorProps {
  value: string;
  onChange: (v: string) => void;
}

function Editor({ value, onChange }: EditorProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
\`\`\`

## Table

| Feature          | Status | Notes                   |
|------------------|--------|-------------------------|
| GFM Tables       | ✅     | Full support            |
| Task Lists       | ✅     | Interactive checkboxes  |
| Syntax Highlight | ✅     | 40+ languages           |
| Dark / Light     | ✅     | System pref + manual    |
| Auto-save        | ✅     | localStorage            |

## Task List

- [x] Project setup
- [x] Live preview
- [x] Syntax highlighting
- [x] Theme toggle
- [ ] Math support

## Blockquote

> "The best way to predict the future is to invent it."
> — **Alan Kay**

Inline \`code\`, **bold**, *italic*, ~~strikethrough~~, and [links](https://example.com).
`;

export function useMarkdown() {
  const [raw, setRaw] = useState<string>(() => {
    try { return localStorage.getItem(KEY) ?? DEFAULT; } catch { return DEFAULT; }
  });

  const [debounced] = useDebounce(raw, 150);

  const update = useCallback((v: string) => {
    setRaw(v);
    try { localStorage.setItem(KEY, v); } catch { /* ignore */ }
  }, []);

  const clear = useCallback(() => update(""), [update]);
  const reset = useCallback(() => update(DEFAULT), [update]);

  const stats = {
    chars: raw.length,
    words: raw.trim() === "" ? 0 : raw.trim().split(/\s+/).length,
    lines: raw.split("\n").length,
    readingTime: Math.max(1, Math.ceil(raw.trim().split(/\s+/).length / 200)),
  };

  return { raw, debounced, update, clear, reset, stats };
}
