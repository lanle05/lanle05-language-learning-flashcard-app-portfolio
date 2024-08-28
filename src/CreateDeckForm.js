import React, { useState } from "react";
import { translateWord } from "./api";
import { db } from "./firebaseConfig"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore"; // Import Firestore methods

export default function CreateDeckForm() {
  const [baseWord, setBaseWord] = useState("");
  const [deckName, setDeckName] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(""); // Language selection state

  const handleAddFlashcard = async (flashcard) => {
    setFlashcards((prevFlashcards) => [...prevFlashcards, flashcard]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Translate the base word
    const translatedWord = await translateWord(baseWord, selectedLanguage);
    // Add the flashcard to the local state
    handleAddFlashcard({ id: Date.now(), baseWord, translatedWord });

    // Reset base word input
    setBaseWord("");
  };

  const handleSaveDeck = async () => {
    if (deckName && flashcards.length > 0) {
      try {
        // Reference to Firestore collection
        const decksCollectionRef = collection(db, "decks");

        // Add new deck to Firestore
        await addDoc(decksCollectionRef, {
          name: deckName,
          language: selectedLanguage, // Save the selected language
          flashcards: flashcards,
        });

        // Reset form
        setDeckName("");
        setFlashcards([]);
        setSelectedLanguage(""); // Reset language selection
      } catch (error) {
        console.error("Error saving deck:", error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="create-deck-form">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          required
        >
          <option value="" disabled>
            Select Language
          </option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          {/* Add more languages as needed */}
        </select>

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
      </form>

      <div>
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

      {/* Display the flashcards immediately */}
      <div className="flashcards-list">
        <h3>Flashcards in Deck</h3>
        {flashcards.length > 0 ? (
          flashcards.map((flashcard) => (
            <div key={flashcard.id} className="flashcard">
              <p>Base Word: {flashcard.baseWord}</p>
              <p>Translated Word: {flashcard.translatedWord}</p>
            </div>
          ))
        ) : (
          <p>No flashcards added yet.</p>
        )}
      </div>
    </div>
  );
}
