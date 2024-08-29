import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.error("Email already in use. Please use another email.");
      } else {
        console.error("Error signing up:", error);
      }
    }
  };


  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info.
      const user = result.user;
      console.log("User:", user);
      navigate("/dashboard"); // Redirect to dashboard on successful signup
    } catch (error) {
      console.error("Error with Google sign-up:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} className="auth-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={handleGoogleSignUp} className="google-auth-button">
        <FcGoogle />
        Sign Up with Google
      </button>
      <p className="auth-link">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Signup;
