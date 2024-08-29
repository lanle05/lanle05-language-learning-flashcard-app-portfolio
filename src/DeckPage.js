import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import FlashcardList from "./FlashcardList";

function DeckPage() {
  const { deckId } = useParams(); 
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const deckRef = doc(db, "decks", deckId);
        const deckDoc = await getDoc(deckRef);
        if (deckDoc.exists()) {
          setDeck(deckDoc.data());
        } else {
          console.error("No such deck!");
        }
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    };

    fetchDeck();
  }, [deckId]);

  if (!deck) {
    return <p>Loading deck...</p>;
  }

  return (
    <div>
      <h2>{deck.name}</h2>
      <FlashcardList flashcards={deck.flashcards} />
    </div>
  );
}

export default DeckPage;
