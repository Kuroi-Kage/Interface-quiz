import { FileText } from "lucide-react";

export default function FileControls({ file, nQuestions, setNQuestions, loading, onCancel, onGenerate }) {
  return (
    <div className="file-card">
      <div className="file-card-row">
        <FileText size={18} />
        <div>
          <div className="file-name">{file.name}</div>
          <div className="file-size">{(file.size / 1024).toFixed(2)} KB</div>
        </div>
      </div>

      <label className="slider-label">Number of Questions</label>
      <div className="slider-row">
        <input
          type="range"
          min="3"
          max="35"
          value={nQuestions}
          onChange={(e) => setNQuestions(parseInt(e.target.value))}
        />
        <span className="slider-value">{nQuestions}</span>
      </div>

      <div className="file-card-actions">
        <button className="btn-secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
        <button className="btn-primary" onClick={onGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate Quiz"}
        </button>
      </div>
    </div>
  );
}