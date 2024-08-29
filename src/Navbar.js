import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPlus, FaRandom, FaSignOutAlt } from "react-icons/fa";
import { TbProgressHelp } from "react-icons/tb";
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
        <li>
          <a
            href="https://www.loom.com/share/3a3f013d5bfd466eb490b0418fd194cd?sid=6a91a17e-cc52-4b02-bcc3-a6379525291f"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TbProgressHelp /> Help
          </a>
        </li>
      </ul>
      <button className="sign-out-btn" onClick={handleSignOut}>
        <FaSignOutAlt /> Sign Out
      </button>
    </nav>
  );
};

export default Navbar;
