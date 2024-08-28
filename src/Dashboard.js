import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FlashcardList from "./FlashcardList";
import { db } from "./firebaseConfig"; // Import Firestore instance
import { collection, getDocs } from "firebase/firestore"; // Import Firestore methods

function Dashboard() {
  const [customDeck, setCustomDeck] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    try {
      const decksCollectionRef = collection(db, "decks");
      const snapshot = await getDocs(decksCollectionRef);
      const decks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCustomDeck(decks);
    } catch (error) {
      console.error("Error fetching decks:", error);
    }
  };

  const handleCreateDeckRedirect = () => {
    navigate("/create-deck"); // Redirect to the correct route for deck creation
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={handleCreateDeckRedirect} className="create-deck-button">
        Create a New Custom Deck
      </button>

      <h2>Your Decks</h2>
      {customDeck.length > 0 ? (
        customDeck.map((deck) => (
          <div key={deck.id} className="deck">
            <h3>{deck.name}</h3>
            <FlashcardList flashcards={deck.flashcards} />
          </div>
        ))
      ) : (
        <p>No decks available. Create a new deck!</p>
      )}

      {/* Here you can add components to track progress and view past cards */}
    </div>
  );
}

export default Dashboard;
