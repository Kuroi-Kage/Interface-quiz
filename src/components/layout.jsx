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
      </nav>

      <Outlet />

      <footer>
        <div className="badges">
          <span className="badge">React 18 (Vite)</span>
          <span className="badge">Flask API</span>
          <span className="badge">spaCy / regex fallback</span>
          <span className="badge">pdfplumber</span>
        </div>
        <p>
          Frontend React connecté en direct à l'API Flask du pipeline (backend/app.py).
          Aucune étape n'est simulée : chaque quiz généré ici est le résultat réel du
          traitement du PDF déposé.
        </p>
      </footer>
    </div>
  );
}