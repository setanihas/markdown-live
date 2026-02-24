import { EditorPane } from "@/components/molecules/EditorPane";
import { PreviewPane } from "@/components/molecules/PreviewPane";
import { useResizableSplit } from "@/hooks/useResizableSplit";
import type { PanelLayout } from "@/hooks/useResizableSplit";
import s from "./SplitEditor.module.css";

interface Props { raw: string; preview: string; onChange: (v: string) => void; layout: PanelLayout; }

export function SplitEditor({ raw, preview, onChange, layout }: Props) {
  const { split, dragging, onMouseDown, containerRef } = useResizableSplit(50);

  if (layout === "editor") return <div className={s.single}><EditorPane value={raw} onChange={onChange} /></div>;
  if (layout === "preview") return <div className={s.single}><PreviewPane content={preview} /></div>;

  return (
    <div ref={containerRef} className={[s.split, dragging ? s.dragging : ""].join(" ")}>
      <div className={s.panel} style={{ width: `${split}%` }}>
        <EditorPane value={raw} onChange={onChange} />
      </div>

      <div
        className={s.divider}
        onMouseDown={onMouseDown}
        role="separator"
        aria-label="Resize panels"
        aria-orientation="vertical"
        tabIndex={0}
      >
        <div className={s.handle}><span /><span /><span /></div>
      </div>

      <div className={s.panel} style={{ width: `${100 - split}%` }}>
        <PreviewPane content={preview} />
      </div>
    </div>
  );
}
