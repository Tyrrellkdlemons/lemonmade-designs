import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
  shine?: boolean;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-body font-semibold text-base transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-ring";

const variants = {
  primary: "bg-lemon text-navy shadow-glow hover:shadow-glow-lg",
  secondary: "border-2 border-electric text-electric-soft hover:bg-electric/10",
  ghost: "border border-white/20 text-cream hover:border-lemon/60 hover:text-lemon",
};

export default function Button({
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  shine = false,
  children,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${shine ? "btn-shine" : ""} ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
