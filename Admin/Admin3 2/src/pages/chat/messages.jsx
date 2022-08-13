import { useState, useEffect } from 'react';
import axios from 'axios';
import './messages.css'

export default function messages({message, own}) {
  return (
    // <div className={own ? "message own": "message"}>
      
    //         <div className="message-top">
    //             <p>{message.text}</p>
    //         </div>
    //     </div>
    <div
        style={{ animationDelay: `0.8s` }}
        className={own ? "message own": "message"}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{message.text}</div>
        
        </div>
      </div>
  );
}