import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { Badge } from "@/components/atoms/Badge";
import type { Theme } from "@/hooks/useTheme";
import s from "./Header.module.css";

interface Props { theme: Theme; onToggleTheme: () => void; }

export function Header({ theme, onToggleTheme }: Props) {
  return (
    <header className={s.header}>
      <div className={s.brand}>
        <span className={s.title}>MarkdownLive</span>
        <Badge variant="accent">v1.0</Badge>
      </div>

      {/* <span className={s.tagline}>Real-time Markdown Preview</span> */}

      <div className={s.right}>
        <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noopener noreferrer" className={s.link}>
          <HelpIcon /> Cheat Sheet
        </a>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}

function HelpIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );
}
