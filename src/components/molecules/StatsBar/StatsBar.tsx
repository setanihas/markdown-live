import s from "./StatsBar.module.css";

interface Props { chars: number; words: number; lines: number; readingTime: number; isSaved: boolean; }

export function StatsBar({ chars, words, lines, readingTime, isSaved }: Props) {
  return (
    <div className={s.bar}>
      <div className={s.stats}>
        <Stat val={words}  label="words"   />
        <Sep />
        <Stat val={chars}  label="chars"   />
        <Sep />
        <Stat val={lines}  label="lines"   />
        <Sep />
        <Stat val={readingTime} label="min read" />
      </div>
      <div className={s.right}>
        <span className={[s.save, isSaved ? s.saved : s.unsaved].join(" ")}>
          {isSaved
            ? <><CheckIcon />Saved</>
            : <><DotIcon />Saving…</>}
        </span>
        <Sep />
        <span className={s.hint}>Auto-saved to localStorage</span>
      </div>
    </div>
  );
}

function Stat({ val, label }: { val: number; label: string }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-sans)", fontSize: 11.5 }}>
      <b style={{ fontWeight: 600, color: "var(--text-2)", fontVariantNumeric: "tabular-nums" }}>{val.toLocaleString()}</b>
      <span style={{ color: "var(--text-3)" }}>{label}</span>
    </span>
  );
}
function Sep() {
  return <span style={{ width: 1, height: 14, background: "var(--border)", margin: "0 6px", flexShrink: 0, display: "inline-block" }} />;
}
function CheckIcon() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>;
}
function DotIcon() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
}
