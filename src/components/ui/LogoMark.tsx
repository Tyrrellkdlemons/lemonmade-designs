import { Link } from "react-router-dom";

interface LogoMarkProps {
  className?: string;
  imgClassName?: string;
  showText?: boolean;
}

export default function LogoMark({
  className = "",
  imgClassName = "h-12 w-12",
  showText = true,
}: LogoMarkProps) {
  return (
    <Link
      to="/"
      className={`focus-ring inline-flex items-center gap-2.5 rounded-xl ${className}`}
      aria-label="LemonMade Designs home"
    >
      <img
        src="/logo/lemonmade-logo-mark.jpg"
        alt=""
        width="512"
        height="512"
        decoding="async"
        className={`${imgClassName} rounded-xl object-cover shadow-[0_0_22px_rgba(255,210,26,0.2)]`}
      />
      {showText && (
        <span className="leading-none">
          <span className="block font-display text-lg font-bold tracking-tight text-cream sm:text-xl">
            Lemon<span className="text-lemon">Made</span>
          </span>
          <span className="mt-1 block text-[0.58rem] font-bold uppercase tracking-[0.28em] text-cream/60">
            Designs
          </span>
        </span>
      )}
    </Link>
  );
}
