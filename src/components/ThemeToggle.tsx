/**
 * Light/dark theme toggle. State lives on <html class="dark"> + localStorage
 * ("mfj_theme"). A small inline script in __root applies the saved theme before
 * paint (no flash), so this component only needs to read the current class and
 * flip it. SSR-safe: renders a stable button, syncs in an effect.
 */
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const KEY = "mfj_theme";

export function setTheme(dark: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  try {
    localStorage.setItem(KEY, dark ? "dark" : "light");
  } catch {}
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-alt text-ink transition-colors hover:bg-surface-alt/70 ${className}`}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

/**
 * Inline script string applied in <head> before paint to avoid a flash of the
 * wrong theme. Honours a saved choice, else the OS preference.
 */
export const THEME_INIT_SCRIPT = `
try {
  var t = localStorage.getItem('${KEY}');
  var d = t ? t === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (d) document.documentElement.classList.add('dark');
} catch (e) {}
`;
