import { useState, useCallback } from "react";

export function useClipboard(ms = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = Object.assign(document.createElement("textarea"), {
        value: text,
        style: "position:fixed;opacity:0",
      });
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), ms);
  }, [ms]);

  return { copy, copied };
}
