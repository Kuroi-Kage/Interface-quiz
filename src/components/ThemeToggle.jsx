import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try {
      return window.localStorage.getItem("theme") || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      aria-label="Changer de thème"
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}