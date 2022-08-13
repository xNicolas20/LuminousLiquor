import React from "react";
import "./spinner.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";


export default function LoadingSpinner() {
const[email, setEmail] = useState("")
     const[password, setPassword] = useState("")
    const [user, setUser] = useState([])




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
