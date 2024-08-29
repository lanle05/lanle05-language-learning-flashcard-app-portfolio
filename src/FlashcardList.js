import React, { useState, useEffect, useRef } from "react";
import Flashcard from "./Flashcard_card";

export default function FlashcardList({ flashcards }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const cardRef = useRef(null);

  const handleNextCard = () => {
    setDirection("next");
    setCurrentCardIndex((prevIndex) =>
      prevIndex < flashcards.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePreviousCard = () => {
    setDirection("prev");
    setCurrentCardIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : flashcards.length - 1
    );
  };

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.classList.add(`slide-${direction}`);
      const animationEndHandler = () => {
        if (cardRef.current) {
          cardRef.current.classList.remove(`slide-next`, `slide-prev`);
        }
      };
      cardRef.current.addEventListener("animationend", animationEndHandler);
      return () => {
        if (cardRef.current) {
          cardRef.current.removeEventListener(
            "animationend",
            animationEndHandler
          );
        }
      };
    }
  }, [currentCardIndex, direction]);

  if (flashcards.length === 0) {
    return <div>No flashcards available.</div>;
  }

  return (
    <div className="flashcard-container">
      <div ref={cardRef} className="card">
        <Flashcard flashcard={flashcards[currentCardIndex] || {}} />
      </div>
      <div className="button-container">
        <button className="prev-button" onClick={handlePreviousCard}>
          Back
        </button>
        <button className="next-button" onClick={handleNextCard}>
          Next
        </button>
      </div>
    </div>
  );
}
