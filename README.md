# Quiz Platform — Interface

Interface React (Vite) pour générer et passer des quiz à partir de documents PDF.

**API requise :** [deeplearning_nlp](https://github.com/Kuroi-Kage/deeplearning_nlp) (Flask) — cette interface a besoin de l'API backend pour fonctionner.

## Stack

- React 19 + Vite
- React Router (navigation Générer un quiz / Historique)
- lucide-react (icônes)
- Mode clair / sombre
- Historique des quiz stocké en local (localStorage)

## Installation

```bash
npm install
```

## Configuration

Copie `.env.example` en `.env` et ajuste si besoin :

## Lancer en développement

```bash
npm run dev
```

Ouvre `http://localhost:5173`. **Le backend Flask doit tourner en parallèle** sur le port 5000 (voir [deeplearning_nlp](https://github.com/Kuroi-Kage/deeplearning_nlp)).

## Build de production

```bash
npm run build
npm run preview
```