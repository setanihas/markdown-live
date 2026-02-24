import { useState, useEffect, useCallback } from "react";

export type Theme = "dark" | "light";
const KEY = "md-theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(KEY) as Theme | null;
      if (stored === "dark" || stored === "light") return stored;
    } catch { /* ignore */ }
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem(KEY, theme); } catch { /* ignore */ }
  }, [theme]);

  const toggle = useCallback(() => {
    document.documentElement.classList.add("theme-transition");
    setTheme((t) => (t === "dark" ? "light" : "dark"));
    window.setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 300);
  }, []);

  return { theme, toggle };
}
