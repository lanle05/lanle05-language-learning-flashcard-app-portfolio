import React from "react";
import { useNavigate } from "react-router-dom";

const BackToDashboardButton = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <button
      onClick={handleBackToDashboard}
      className="back-to-dashboard-button"
    >
      Back to Dashboard
    </button>
  );
};

export default BackToDashboardButton;
