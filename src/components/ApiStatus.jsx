import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function ApiStatus() {
  const [online, setOnline] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/health`)
      .then((r) => (r.ok ? setOnline(true) : setOnline(false)))
      .catch(() => setOnline(false));
  }, []);

  if (online === null) return null;

  return (
    <span className="stack-note">
      <span className={`dot ${online ? "" : "off"}`}></span>
      API Flask {online ? "connectée (localhost:5000)" : "injoignable — lance `python app.py` dans backend/"}
    </span>
  );
}