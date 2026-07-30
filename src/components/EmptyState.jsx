import { Upload, Sliders, CheckCircle2 } from "lucide-react";

export default function EmptyState() {
  const steps = [
    { icon: Upload, title: "Dépose ton PDF", text: "Un cours, un rapport, un article — en français ou en anglais." },
    { icon: Sliders, title: "Choisis le nombre de questions", text: "De 3 à 15, ajustable avant de lancer la génération." },
    { icon: CheckCircle2, title: "Réponds et vérifie ton score", text: "Chaque question vient du contenu réel de ton document." },
  ];

  return (
    <div className="empty-state">
      {steps.map((s, i) => {
        const Icon = s.icon;
        return (
          <div className="step" key={i}>
            <span className="step-n"><Icon size={13} /></span>
            <h3 className="step-title">{s.title}</h3>
            <p className="step-text">{s.text}</p>
          </div>
        );
      })}
    </div>
  );
}