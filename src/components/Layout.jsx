import { Outlet, NavLink } from "react-router-dom";
import { FileText } from "lucide-react";
import ApiStatus from "./ApiStatus";
import ThemeToggle from "./ThemeToggle";

export default function Layout() {
  return (
    <div className="app">
      <header className="hero">
        <div className="hero-icon">
          <FileText size={20} />
        </div>
        <div>
          <h1>Quiz Platform</h1>
          <p className="lede">Génère et passe des quiz professionnels à partir de documents PDF.</p>
          <ApiStatus />
        </div>
        <ThemeToggle />
      </header>

      <nav className="main-nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Générer un quiz
        </NavLink>
        <NavLink to="/historique" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Historique
        </NavLink>
        <a
  href="https://github.com/Kuroi-Kage/Interface-quiz#readme"
  target="_blank"
  rel="noopener noreferrer"
  className="nav-link nav-link-external"
>
  Documentation
</a>
      </nav>

      <Outlet />
    </div>
  );
}