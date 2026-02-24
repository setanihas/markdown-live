import s from "./Badge.module.css";

interface BadgeProps { children: React.ReactNode; variant?: "default" | "accent" | "green"; }

export function Badge({ children, variant = "default" }: BadgeProps) {
  return <span className={[s.badge, s[variant]].join(" ")}>{children}</span>;
}
