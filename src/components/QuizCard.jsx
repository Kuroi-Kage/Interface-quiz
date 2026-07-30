export default function QuizCard({ item, index, selected, onSelect, revealed }) {
  return (
    <div className="qcard" style={{ animationDelay: `${index * 0.06}s` }}>
      <p className="qn">Question {index + 1}</p>
      <p className="qt">{item.question}</p>
      {item.choices.map((choice, ci) => {
        let cls = "choice";
        if (revealed) {
          if (ci === item.correct_index) cls += " correct";
          else if (ci === selected) cls += " wrong";
        }
        return (
          <label key={ci} className={cls}>
            <input
              type="radio"
              name={`q${index}`}
              disabled={revealed}
              checked={selected === ci}
              onChange={() => onSelect(index, ci)}
            />
            <span>{choice}</span>
          </label>
        );
      })}
    </div>
  );
}