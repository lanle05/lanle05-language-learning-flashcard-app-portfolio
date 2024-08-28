import React, { useState } from "react";
import Flashcard from "./Flashcard_card";

export default function FlashcardList({ flashcards }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex < flashcards.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePreviousCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : flashcards.length - 1
    );
  };

  if (flashcards.length === 0) {
    return <p>No flashcards available.</p>;
  }
  
  return (
    <>
      <div className="card">
        <Flashcard
          flashcard={flashcards[currentCardIndex]}
          key={flashcards[currentCardIndex].id}
        />
      </div>
      <div className="button-container">
        <button onClick={handlePreviousCard} className="prev-button">
          Back
        </button>
        <button onClick={handleNextCard} className="next-button">
          Next
        </button>
      </div>
    </> 
  );
}
