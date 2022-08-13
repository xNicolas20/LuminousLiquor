import React from "react";
import "./spinner.css";

export default function LoadingSpinner() {
  return (
    <div className="big-cnt">
      <div className="cnt">
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    </div>
  );
}
