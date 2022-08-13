import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom'
import axios from "axios";
import { useNavigate } from "react-router-dom";
function ActivationEmail(){
const {activation_token} = useParams()
   const navigate = useNavigate();
    
        const activationEmail = () => {
            console.log(activation_token)
            if(activation_token){
            try {
                axios.post("https://luminious-liquor.herokuapp.com/activate", {activation_token}).then((res) => {
                alert(res.data.message);
                 navigate("/login");
      })
            } catch (err) {
                alert(err)
            }
        }
    } 
    

    return(
        <div className="active">
        <input type="button" value="ACTIVATE" onClick={activationEmail} />
        </div>
    )
}

export default ActivationEmail