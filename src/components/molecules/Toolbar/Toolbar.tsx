import { IconButton } from "@/components/atoms/IconButton";
import type { PanelLayout } from "@/hooks/useResizableSplit";
import s from "./Toolbar.module.css";

interface Props {
  layout: PanelLayout;
  onLayoutChange: (l: PanelLayout) => void;
  onCopy: () => void; copied: boolean;
  onClear: () => void; onReset: () => void;
  onDownload: () => void; onPrint: () => void;
}

export function Toolbar({ layout, onLayoutChange, onCopy, copied, onClear, onReset, onDownload, onPrint }: Props) {
  return (
    <div className={s.bar}>
      <div className={s.group}>
        <IconButton label="Editor only"  active={layout === "editor"}  onClick={() => onLayoutChange(layout === "editor" ? "split" : "editor")}>
          <PanelLeftIcon /> Editor
        </IconButton>
        <IconButton label="Split view"   active={layout === "split"}   onClick={() => onLayoutChange("split")}>
          <SplitIcon /> Split
        </IconButton>
        <IconButton label="Preview only" active={layout === "preview"} onClick={() => onLayoutChange(layout === "preview" ? "split" : "preview")}>
          <PanelRightIcon /> Preview
        </IconButton>
      </div>

      <div className={s.spacer} />

      <div className={s.group}>
        <IconButton label="Reset to default" size="sm" onClick={onReset}><ResetIcon />Reset</IconButton>
        <IconButton label="Clear editor" size="sm" variant="danger" onClick={onClear}><TrashIcon />Clear</IconButton>
        <div className={s.divider} />
        <IconButton label={copied ? "Copied!" : "Copy markdown"} size="sm" variant={copied ? "accent" : "default"} onClick={onCopy}>
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied!" : "Copy"}
        </IconButton>
        <IconButton label="Download .md" size="sm" onClick={onDownload}><DownloadIcon />.md</IconButton>
        <IconButton label="Print / PDF"  size="sm" onClick={onPrint}><PrintIcon />Print</IconButton>
      </div>
    </div>
  );
}

/* ── Icons ── */
const ico = (d: string, extra?: string) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...(extra ? { strokeLinecap: "round" as const, strokeLinejoin: "round" as const } : {})}>
    <path d={d} />
  </svg>
);

function SplitIcon() { return <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><line x1="8" y1="1" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5"/></svg>; }
function PanelLeftIcon() { return <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><line x1="7" y1="1" x2="7" y2="15" stroke="currentColor" strokeWidth="1.5" opacity=".3"/></svg>; }
function PanelRightIcon() { return <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><line x1="9" y1="1" x2="9" y2="15" stroke="currentColor" strokeWidth="1.5" opacity=".3"/></svg>; }
function ResetIcon()    { return ico("M1 4v6h6M3.51 15a9 9 0 1 0 .49-5"); }
function TrashIcon()    { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>; }
function CopyIcon()     { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>; }
function CheckIcon()    { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>; }
function DownloadIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>; }
function PrintIcon()    { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>; }
