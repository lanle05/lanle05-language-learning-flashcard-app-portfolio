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
import CreateDeckForm from "./CreateDeckForm"; // Import the CreateDeckForm component
import { auth } from "./firebaseConfig"; // Import auth from firebaseConfig
import "./app.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Use null as initial state to check for loading

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // User is authenticated
      } else {
        setIsAuthenticated(false); // User is not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup the subscription on unmount
  }, []);

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // Loading state while checking authentication
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
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
          <Route path="/" element={<Navigate to="/signup" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
