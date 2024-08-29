import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./Dashboard.css";
import ProgressBar from "./ProgressBar";
import ShareButton from "./ShareButton";
import BackToDashboardButton from "./BackToDashboardButton"; // Not necessary here, but shown for consistency

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
    navigate("/create-deck");
  };

  const handleRandomDeckRedirect = () => {
    navigate("/random-deck");
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="button-container">
        <button
          onClick={handleCreateDeckRedirect}
          className="create-deck-button"
        >
          Create a New Custom Deck
        </button>
        <button
          onClick={handleRandomDeckRedirect}
          className="random-deck-button"
        >
          Create a Random Deck
        </button>
      </div>

      <h2>Your Progress</h2>
      <ProgressBar current={customDeck.length} total={10} />

      <h2>Your Decks</h2>
      <div className="decks-container">
        {customDeck.length > 0 ? (
          customDeck.map((deck) => (
            <div key={deck.id} className="deck-card">
              <Link to={`/deck/${deck.id}`} className="deck-link">
                <h3 className="deck-name">{deck.name}</h3>
                <p className="deck-info">Cards: {deck.flashcards.length}</p>
                <p className="deck-info">Language: {deck.language}</p>
              </Link>
              <ShareButton
                title={`Check out my ${deck.language} flashcard deck!`}
                text={`Here are ${deck.flashcards.length} cards to help you learn ${deck.language}.`}
                url={window.location.href}
              />
            </div>
          ))
        ) : (
          <p className="no-decks-message">
            No decks available. Create a new deck!
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
