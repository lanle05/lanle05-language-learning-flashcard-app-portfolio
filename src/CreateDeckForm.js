import React, { useState } from "react";
import { translateWord } from "./api";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import Flashcard from "./Flashcard_card";
import ShareButton from "./ShareButton";
import BackToDashboardButton from "./BackToDashboardButton";
import "./CreateDeckForm.css";

export default function CreateDeckForm() {
  const [baseWord, setBaseWord] = useState("");
  const [deckName, setDeckName] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("fr");

  const handleAddFlashcard = async (e) => {
    e.preventDefault();

    const translatedWord = await translateWord(baseWord, selectedLanguage);
    const newFlashcard = { id: Date.now(), baseWord, translatedWord };
    setFlashcards((prevFlashcards) => [...prevFlashcards, newFlashcard]);
    setBaseWord("");
  };

  const handleSaveDeck = async (e) => {
    e.preventDefault();
    if (deckName && flashcards.length > 0) {
      try {
        const decksCollectionRef = collection(db, "decks");
        await addDoc(decksCollectionRef, {
          name: deckName,
          flashcards: flashcards,
          language: selectedLanguage,
        });
        alert("Deck saved successfully!");
        setDeckName("");
        setFlashcards([]);
      } catch (error) {
        console.error("Error saving deck:", error);
      }
    }
  };

  return (
    <div className="create-deck-container">
      <BackToDashboardButton />
      <form onSubmit={handleAddFlashcard} className="create-deck-form">
        <div className="language-select">
          <label htmlFor="language-select">Select Language: </label>
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="zh">Chinese</option>
            {/* Add more languages as needed */}
          </select>
        </div>
        <div className="word-input-container">
          <input
            type="text"
            value={baseWord}
            onChange={(e) => setBaseWord(e.target.value)}
            placeholder="Enter base word"
            required
          />
          <button type="submit" className="add-word-button">
            Add to Deck
          </button>
        </div>
      </form>
      <div className="save-deck-container">
        <input
          type="text"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          placeholder="Enter deck name"
          required
        />
        <button onClick={handleSaveDeck} className="save-deck-button">
          Save Deck
        </button>
      </div>
      <div className="flashcards-preview">
        {flashcards.map((flashcard) => (
          <Flashcard key={flashcard.id} flashcard={flashcard} />
        ))}
      </div>
      <ShareButton
        title="Check out my new custom flashcard deck!"
        text={`I just created a new flashcard deck in ${selectedLanguage}.`}
        url={window.location.href}
      />
    </div>
  );
}
