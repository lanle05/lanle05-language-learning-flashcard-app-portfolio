import React, { useState } from "react";
import { translateWord } from "./api";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import FlashcardList from "./FlashcardList";
import ShareButton from "./ShareButton";
import BackToDashboardButton from "./BackToDashboardButton";
import "./CreateDeckForm.css";
import { auth } from "./firebaseConfig";

export default function CreateDeckForm() {
  const [baseWord, setBaseWord] = useState("");
  const [deckName, setDeckName] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("fr");

 const handleAddFlashcard = async (e) => {
   e.preventDefault();

   const translatedWord = await translateWord(baseWord, selectedLanguage);
   if (baseWord && translatedWord) {
     const newFlashcard = { id: Date.now(), baseWord, translatedWord };
     setFlashcards((prevFlashcards) => [...prevFlashcards, newFlashcard]);
     setBaseWord("");
   } else {
     console.error("Failed to translate word");
     
   }
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
          userId: auth.currentUser.uid, 
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
      <h2>Create a New Deck</h2>
      <form className="create-deck-form" onSubmit={handleAddFlashcard}>
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
          <button type="submit">Add to Deck</button>
        </div>
      </form>

      <div className="flashcards-preview">
        <h3>Flashcards Preview</h3>
        <FlashcardList flashcards={flashcards} />
      </div>

      <form className="save-deck-container" onSubmit={handleSaveDeck}>
        <input
          type="text"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          placeholder="Enter deck name"
          required
        />
        <button type="submit">Save Deck</button>
      </form>

      <ShareButton />
      <BackToDashboardButton />
    </div>
  );
}
