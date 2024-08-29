import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        console.error("Wrong password. Please try again.");
        <p>Wrong Password. Please try again</p>
      } else if (error.code === "auth/user-not-found") {
        console.error("No user found with this email. Please sign up.");
        <p>No user found with this email. Please sign up.</p>;
      } else {
        console.error("Error logging in:", error);
      }
    }
  };


  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info.
      const user = result.user;
      console.log("User:", user);
      navigate("/dashboard"); // Redirect to dashboard on successful login
    } catch (error) {
      console.error("Error with Google sign-in:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
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
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleSignIn} className="google-auth-button">
        <FcGoogle />
        Sign In with Google
      </button>
      <p className="auth-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
