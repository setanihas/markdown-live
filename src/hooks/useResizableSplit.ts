import { useState, useRef, useCallback, useEffect } from "react";

export type PanelLayout = "split" | "editor" | "preview";

export function useResizableSplit(initial = 50) {
  const [split, setSplit] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const move = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      setSplit(Math.min(80, Math.max(20, ((e.clientX - r.left) / r.width) * 100)));
    };
    const up = () => setDragging(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, [dragging]);

  return { split, dragging, onMouseDown, containerRef };
}
