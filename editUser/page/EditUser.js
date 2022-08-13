import Header from "../components/Header";
import Input from "../components/Input";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditUser.css";
import Navbar from "../../components/navbar/navbar"


const EditUser = () => {

  const navigate = useNavigate()


  useEffect(()=> {
      let data = sessionStorage.getItem('myUser')
      data = JSON.parse(data)
      console.log(data)
      if(data==null){
        navigate("/login")
      }else{
        navigate("/edituser")
      }
  }, [])

  return (
    <div className="ediUser-page">
      <Navbar />
      <Input />
    </div>
  );
};

export default EditUser;
