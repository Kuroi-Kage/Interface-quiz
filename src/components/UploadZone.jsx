import { useState, useCallback } from "react";
import { UploadCloud } from "lucide-react";

export default function UploadZone({ file, setFile }) {
  const [dragOver, setDragOver] = useState(false);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f && f.type === "application/pdf") setFile(f);
    },
    [setFile]
  );

  return (
    <div
      className={`upload-zone ${dragOver ? "dragover" : ""}`}
      onClick={() => document.getElementById("fileInput").click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
    >
      <div className="icon">
        <UploadCloud size={26} strokeWidth={1.5} />
      </div>
      <div className="main-label">
        {file ? file.name : "Dépose ton PDF ici"}
      </div>
      <div className="sub-label">
        {file ? "Prêt à générer le quiz" : "Glisse-dépose ou clique pour parcourir"}
      </div>
      {file && <div className="filename">{(file.size / 1024).toFixed(2)} KB</div>}
      <input
        id="fileInput"
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0] || null)}
      />
    </div>
  );
}