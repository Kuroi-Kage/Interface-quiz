import { useState, useEffect } from "react";
import { Trash2, FileText } from "lucide-react";
import { getHistory, clearHistory } from "../lib/history";

export default function History() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(getHistory());
  }, []);

  const handleClear = () => {
    clearHistory();
    setEntries([]);
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (entries.length === 0) {
    return (
      <div className="panel">
        <div className="history-empty">
          <FileText size={28} strokeWidth={1.5} />
          <p className="main-label" style={{ marginTop: 10 }}>Aucun quiz dans l'historique</p>
          <p className="sub-label">Les quiz que tu termines apparaîtront ici.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="history-header">
        <p className="eyebrow">{entries.length} quiz enregistré{entries.length > 1 ? "s" : ""}</p>
        <button className="reset-link" onClick={handleClear}>
          <Trash2 size={13} style={{ marginRight: 4, verticalAlign: "-2px" }} />
          Effacer l'historique
        </button>
      </div>

      {entries.map((e, i) => (
        <div className="history-item" key={i}>
          <div>
            <p className="qt" style={{ margin: 0, fontSize: "14.5px" }}>{e.filename}</p>
            <p className="sub-label" style={{ margin: "4px 0 0" }}>
              {formatDate(e.date)} · Langue : {e.language}
            </p>
          </div>
          <span className="meta-badge">{e.score} / {e.total}</span>
        </div>
      ))}
    </div>
  );
}