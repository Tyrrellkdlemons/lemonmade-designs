import { Link } from "react-router-dom";

interface LogoMarkProps {
  className?: string;
  imgClassName?: string;
}

export default function LogoMark({ className = "", imgClassName = "h-12" }: LogoMarkProps) {
  return (
    <Link to="/" className={`inline-flex items-center focus-ring rounded-lg ${className}`} aria-label="LemonMade Designs — Home">
      <img
        src="/logo/lemonmade-logo-md.png"
        alt="LemonMade Designs logo — a lemon with a code window and the tagline Websites Made Fresh"
        className={`${imgClassName} w-auto`}
      />
    </Link>
  );
}
