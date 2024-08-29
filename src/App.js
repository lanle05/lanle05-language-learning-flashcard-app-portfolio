import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Dashboard from "./Dashboard";
import RandomDeckPage from "./RandomDeckPage";
import Login from "./Login";
import Signup from "./Signup_page";
import CreateDeckForm from "./CreateDeckForm";
import { auth } from "./firebaseConfig";
import "./App.css";
import DeckPage from "./DeckPage";
import Navbar from "./Navbar";
import Footer from "./Footer";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/random-deck"
            element={
              isAuthenticated ? <RandomDeckPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/create-deck"
            element={
              isAuthenticated ? <CreateDeckForm /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/deck/:deckId"
            element={isAuthenticated ? <DeckPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
