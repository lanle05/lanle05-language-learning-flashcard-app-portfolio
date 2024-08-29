import React, { useState } from "react";

export default function Flashcard({ flashcard = {} }) {
  const [flip, setFlip] = useState(false);

  if (!flashcard.baseWord || !flashcard.translatedWord) {
    return <div className="card">No flashcard data available</div>;
  }

  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
    >
      <div className="front">{flashcard.baseWord}</div>
      <div className="back">{flashcard.translatedWord}</div>
    </div>
  );
}
