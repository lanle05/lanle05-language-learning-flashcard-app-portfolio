import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { db, auth } from "./firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./Dashboard.css";
import ProgressBar from "./ProgressBar";
import ShareButton from "./ShareButton";

function Dashboard() {
  const [customDeck, setCustomDeck] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User ID:", auth.currentUser?.uid);
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    try {
      const decksCollectionRef = collection(db, "decks");
      const userDecksQuery = query(
        decksCollectionRef,
        where("userId", "==", auth.currentUser.uid)
      );
      const snapshot = await getDocs(userDecksQuery);
      const decks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("Fetched Decks:", decks);
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
      <h1>Dashboard</h1>
      <ProgressBar />

      <div className="button-container">
        <button onClick={handleCreateDeckRedirect}>
          Create a New Custom Deck
        </button>
        <button onClick={handleRandomDeckRedirect}>Create a Random Deck</button>
      </div>

      <h2>Your Decks</h2>

      <div className="decks-container">
        {customDeck.length > 0 ? (
          customDeck.map((deck) => (
            <div key={deck.id} className="deck-card">
              <Link to={`/deck/${deck.id}`}>
                <h3>{deck.name}</h3>
              </Link>
              <p className="deck-info">
                Cards: {deck.flashcards.length}
                <br />
                Language: {deck.language}
              </p>
              <ShareButton deckId={deck.id} />
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
