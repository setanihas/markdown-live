import { forwardRef, ButtonHTMLAttributes } from "react";
import s from "./IconButton.module.css";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
  variant?: "default" | "accent" | "danger";
  size?: "sm" | "md";
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, active = false, variant = "default", size = "md", children, className, ...rest }, ref) => (
    <button
      ref={ref}
      aria-label={label}
      title={label}
      className={[s.btn, s[variant], s[size], active ? s.active : "", className ?? ""].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </button>
  )
);
IconButton.displayName = "IconButton";
