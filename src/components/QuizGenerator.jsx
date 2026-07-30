import { useState } from "react";
import UploadZone from "../components/UploadZone";
import QuizCard from "../components/QuizCard";
import EmptyState from "../components/EmptyState";
import { addHistoryEntry } from "../lib/history";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function QuizGenerator() {
  const [file, setFile] = useState(null);
  const [nQuestions, setNQuestions] = useState(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(null);

  const handleGenerate = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setQuiz(null);
    setAnswers({});
    setRevealed(false);
    setScore(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("n_questions", nQuestions);

    try {
      const res = await fetch(`${API_BASE}/api/generate-quiz`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Une erreur est survenue.");
      } else {
        setQuiz(data);
      }
    } catch {
      setError("Impossible de contacter l'API. Vérifie que le serveur Flask tourne bien sur le port 5000.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (qIndex, choiceIndex) => {
    if (revealed) return;
    setAnswers((prev) => ({ ...prev, [qIndex]: choiceIndex }));
  };

  const handleSubmit = () => {
    let s = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correct_index) s++;
    });
    setScore(s);
    setRevealed(true);

    addHistoryEntry({
      date: new Date().toISOString(),
      filename: file ? file.name : "document.pdf",
      language: quiz.language,
      score: s,
      total: quiz.questions.length,
    });
  };

  const handleReset = () => {
    setQuiz(null);
    setAnswers({});
    setRevealed(false);
    setScore(null);
    setFile(null);
  };

  return (
    <div className="panel">
      {!file && !quiz && <EmptyState />}

      <UploadZone file={file} setFile={setFile} />

      <div className="controls">
        <label>
          Nombre de questions : <strong>{nQuestions}</strong>
          <input
            type="range"
            min="3"
            max="15"
            value={nQuestions}
            onChange={(e) => setNQuestions(parseInt(e.target.value))}
          />
        </label>
        <button id="generateBtn" onClick={handleGenerate} disabled={!file || loading}>
          {loading ? "Génération..." : "Générer le quiz →"}
        </button>
      </div>

      {loading && (
        <div className="loading">
          <span className="spinner"></span>
          Extraction du texte, détection de langue, génération des questions...
        </div>
      )}

      {error && <div className="error-box">{error}</div>}

      {quiz && (
        <>
          <div className="meta-row">
            <span className="meta-badge">Langue détectée : {quiz.language}</span>
            <span className="meta-badge">{quiz.num_questions} questions générées</span>
          </div>

          {quiz.questions.map((item, i) => (
            <QuizCard
              key={i}
              item={item}
              index={i}
              selected={answers[i]}
              onSelect={handleSelect}
              revealed={revealed}
            />
          ))}

          {!revealed ? (
            <button
              id="submitBtn"
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < quiz.questions.length}
            >
              Valider mes réponses
            </button>
          ) : (
            <>
              <div className="score-banner">
                Score : <span>{score} / {quiz.questions.length}</span>
              </div>
              <button className="reset-link" onClick={handleReset}>
                ← Essayer un autre PDF
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}