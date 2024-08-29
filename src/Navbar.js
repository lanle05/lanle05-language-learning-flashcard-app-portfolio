import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPlus, FaRandom, FaSignOutAlt } from "react-icons/fa";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";
import "./Navbar.css";

const Navbar = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/dashboard">
            <FaHome /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/create-deck">
            <FaPlus /> Create Deck
          </Link>
        </li>
        <li>
          <Link to="/random-deck">
            <FaRandom /> Random Deck
          </Link>
        </li>
      </ul>
      <button className="sign-out-btn" onClick={handleSignOut}>
        <FaSignOutAlt /> Sign Out
      </button>
    </nav>
  );
};

export default Navbar;
