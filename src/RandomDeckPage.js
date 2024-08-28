// src/RandomDeckPage.js
import React, { useState } from "react";
import FlashcardList from "./FlashcardList";
import { generateAndTranslateWord } from "./api";
// import "./randomDeckPage.css";

function RandomDeckPage() {
  const [flashcards, setFlashcards] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("fr");
  const [numCards, setNumCards] = useState(5); // Default number of cards

  const fetchRandomDeck = async () => {
    try {
      const translations = await Promise.all(
        Array.from({ length: numCards }).map(() =>
          generateAndTranslateWord(selectedLanguage)
        )
      );

      setFlashcards(
        translations.map((wordPair, index) => ({
          id: index + 1,
          ...wordPair,
        }))
      );
    } catch (error) {
      console.error("Error generating random deck:", error);
    }
  };

  return (
    <div>
      <h2>Create a Random Deck</h2>
      <div className="controls">
        <div className="language-selector">
          <label htmlFor="language">Select Language: </label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="zh">Chinese (Simplified)</option>
            <option value="ru">Russian</option>
          </select>
        </div>

        <div className="num-cards-selector">
          <label htmlFor="numCards">Number of Cards: </label>
          <input
            type="number"
            id="numCards"
            value={numCards}
            onChange={(e) => setNumCards(parseInt(e.target.value, 10))}
            min="1"
            max="10"
          />
        </div>

        <button onClick={fetchRandomDeck} className="generate-button">
          Generate Random Deck
        </button>
      </div>

      <h2>Generated Deck</h2>
      <FlashcardList flashcards={flashcards} />
    </div>
  );
}

export default RandomDeckPage;
