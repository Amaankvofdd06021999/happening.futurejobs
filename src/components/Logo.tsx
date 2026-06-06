import { Link } from "@tanstack/react-router";

/**
 * Brand wordmark.
 *   • public/logo.png        — colour version (orange "MYFuture" + navy "Jobs"), for light surfaces.
 *   • public/logo-white.png  — dark-mode version (navy half turns white), for dark surfaces.
 *
 * `light` forces the white version (for the brand-gradient auth panels, which are
 * dark in either theme). Otherwise the logo is theme-aware: colour in light mode,
 * white in dark mode — the two images cross-fade via Tailwind's `dark:` variant.
 */
export function Logo({ light = false }: { light?: boolean }) {
  if (light) {
    return (
      <Link to="/" className="inline-flex items-center" aria-label="MYFutureJobs — home">
        <img src="/logo-white.png" alt="MYFutureJobs" className="h-8 w-auto select-none" draggable={false} />
      </Link>
    );
  }

  return (
    <Link to="/" className="inline-flex items-center" aria-label="MYFutureJobs — home">
      <img
        src="/logo.png"
        alt="MYFutureJobs"
        className="h-8 w-auto select-none block dark:hidden"
        draggable={false}
      />
      <img
        src="/logo-white.png"
        alt=""
        aria-hidden
        className="h-8 w-auto select-none hidden dark:block"
        draggable={false}
      />
    </Link>
  );
}
