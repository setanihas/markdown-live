# MarkdownLive

Production-grade real-time Markdown live preview editor. Built with **Vite + React 19 + TypeScript** and **Atomic Design Pattern**.

## Stack

| Tool | Version |
|------|---------|
| React | 19 |
| TypeScript | 5.7 |
| Vite | 6 |
| react-markdown | 9 |
| remark-gfm | 4 |
| rehype-highlight | 7 |

## Quick Start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build
```

## CSS Variables

All fonts, colors and effects are driven by CSS variables on `:root` / `[data-theme]`.

| Variable | Usage |
|---|---|
| `--font-sans` | UI, headings, labels |
| `--font-mono` | Editor textarea, inline code |
| `--font-serif` | Preview body text |

Override any variable at `:root` level to retheme instantly.

## Project Structure

```
src/
├── components/
│   ├── atoms/          IconButton · Badge · ThemeToggle
│   ├── molecules/      EditorPane · PreviewPane · StatsBar · Toolbar
│   ├── organisms/      Header · SplitEditor
│   └── templates/      MainTemplate
├── hooks/
│   ├── useTheme.ts
│   ├── useMarkdown.ts
│   ├── useClipboard.ts
│   └── useResizableSplit.ts
└── styles/
    ├── globals.css     design tokens + reset
    └── markdown.css    preview typography + hljs
```

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `⌘/Ctrl+B` | Bold |
| `⌘/Ctrl+I` | Italic |
| `⌘/Ctrl+K` | Inline code |
| `Tab` | 2-space indent |
