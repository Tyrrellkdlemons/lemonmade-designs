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
  disabled?: boolean;
}

/**
 * Lemon-shaped buttons: organic asymmetric radius (like a lemon profile),
 * candy depth on the primary, and a leaf accent that perks up on hover.
 */
const base =
  "btn-lemon-shape group/btn relative inline-flex items-center justify-center gap-2 px-8 py-3.5 font-display text-base font-bold tracking-wide transition-all duration-200 hover:-translate-y-0.5 active:translate-y-[2px] focus-ring";

const variants = {
  primary: "btn-lemon-primary text-navy",
  secondary: "btn-lemon-outline border-2 border-electric/80 bg-electric/5 text-electric-soft hover:bg-electric/15 hover:shadow-glow-blue",
  ghost: "btn-lemon-outline border border-white/25 text-cream hover:border-lemon/70 hover:text-lemon hover:bg-lemon/5",
};

function Leaf() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="btn-leaf absolute -top-2.5 right-4 h-4 w-4 rotate-[20deg] text-leaf transition-transform duration-300 group-hover/btn:-rotate-[6deg] group-hover/btn:scale-110"
      fill="currentColor"
    >
      <path d="M21 3c-7.5 0-13 3-16.5 8.5C2.6 14.6 2 18 2 21c3 0 6.4-.6 9.5-2.5C17 15 20 9.5 21 3z" />
    </svg>
  );
}

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
  disabled = false,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${shine ? "btn-shine" : ""} ${
    disabled ? "cursor-not-allowed opacity-60" : ""
  } ${className}`;
  const inner = (
    <>
      {variant === "primary" && <Leaf />}
      {children}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel} disabled={disabled}>
      {inner}
    </button>
  );
}
