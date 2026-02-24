import { useState, useCallback } from "react";
import { Header } from "@/components/organisms/Header";
import { SplitEditor } from "@/components/organisms/SplitEditor";
import { Toolbar } from "@/components/molecules/Toolbar";
import { StatsBar } from "@/components/molecules/StatsBar";
import { useTheme } from "@/hooks/useTheme";
import { useMarkdown } from "@/hooks/useMarkdown";
import { useClipboard } from "@/hooks/useClipboard";
import type { PanelLayout } from "@/hooks/useResizableSplit";
import s from "./MainTemplate.module.css";

export function MainTemplate() {
  const { theme, toggle } = useTheme();
  const { raw, debounced, update, clear, reset, stats } = useMarkdown();
  const { copy, copied } = useClipboard();
  const [layout, setLayout] = useState<PanelLayout>("split");
  const [saved, setSaved] = useState(true);

  const handleChange = useCallback((v: string) => {
    setSaved(false);
    update(v);
    window.setTimeout(() => setSaved(true), 600);
  }, [update]);

  const handleDownload = useCallback(() => {
    const url = URL.createObjectURL(new Blob([raw], { type: "text/markdown;charset=utf-8" }));
    Object.assign(document.createElement("a"), { href: url, download: "document.md" }).click();
    URL.revokeObjectURL(url);
  }, [raw]);

  return (
    <div className={s.app}>
      <Header theme={theme} onToggleTheme={toggle} />
      <Toolbar
        layout={layout} onLayoutChange={setLayout}
        onCopy={() => copy(raw)} copied={copied}
        onClear={clear} onReset={reset}
        onDownload={handleDownload}
        onPrint={() => window.print()}
      />
      <div className={s.editor}>
        <SplitEditor raw={raw} preview={debounced} onChange={handleChange} layout={layout} />
      </div>
      <StatsBar
        chars={stats.chars} words={stats.words}
        lines={stats.lines} readingTime={stats.readingTime}
        isSaved={saved}
      />
    </div>
  );
}
