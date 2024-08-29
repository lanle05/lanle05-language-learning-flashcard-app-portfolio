import React, { useState } from "react";
import FlashcardList from "./FlashcardList";
import { generateAndTranslateWord } from "./api";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import ShareButton from "./ShareButton";
import BackToDashboardButton from "./BackToDashboardButton";
import "./RandomDeckPage.css";

function RandomDeckPage() {
  const [flashcards, setFlashcards] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("fr");
  const [numCards, setNumCards] = useState(5);
  const [deckName, setDeckName] = useState("");

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

  const handleSaveDeck = async () => {
    if (deckName && flashcards.length > 0) {
      try {
        const decksCollectionRef = collection(db, "decks");
        await addDoc(decksCollectionRef, {
          name: deckName,
          flashcards: flashcards,
          language: selectedLanguage,
        });
        alert("Deck saved successfully!");
      } catch (error) {
        console.error("Error saving deck:", error);
      }
    }
  };

  return (
    <div className="random-deck-page">
      <BackToDashboardButton />
      <h2 className="page-title">Create a Random Deck</h2>
      <div className="controls">
        <div className="control-group">
          <label htmlFor="language">Select Language: </label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="select-input"
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

        <div className="control-group">
          <label htmlFor="numCards">Number of Cards: </label>
          <input
            type="number"
            id="numCards"
            value={numCards}
            onChange={(e) => setNumCards(parseInt(e.target.value, 10))}
            min="1"
            max="10"
            className="number-input"
          />
        </div>

        <button onClick={fetchRandomDeck} className="generate-button">
          Generate Random Deck
        </button>
      </div>
      <h2 className="section-title">Generated Deck</h2>
      <FlashcardList flashcards={flashcards} />
      {flashcards.length > 0 && (
        <div className="save-deck-section">
          <input
            type="text"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            placeholder="Enter deck name"
            required
            className="deck-name-input"
          />
          <button onClick={handleSaveDeck} className="save-deck-button">
            Save Deck
          </button>
          <ShareButton
            title="Check out this random flashcard deck!"
            text={`I just generated a new flashcard deck in ${selectedLanguage}.`}
            url={window.location.href}
          />
        </div>
      )}
    </div>
  );
}

export default RandomDeckPage;
