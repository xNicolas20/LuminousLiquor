import React from 'react';
import Header from '../components/header';
import Body from '../components/body';
import Footer from '../components/footer';
import Navbar2 from '../../components/navbar/navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar_loggedout from '../../components/navbar/navbar_loggedout';
import { MuiDialog } from '../../components/MuiDialog';
import { useState } from 'react';
import { useEffect } from "react";
import Footer_loggedout from '../components/footer_loggedout'
import { useNavigate } from "react-router-dom";
import SupportChat from '../../supportChat/page/SupportChat'




const Homepage = () =>{
    const navigate = useNavigate()


    useEffect(()=> {
        let data = sessionStorage.getItem('myUser')
        data = JSON.parse(data)
        console.log(data)
        if(data==null){
          navigate("/")
        }else{
          navigate("/homepage")
        }
    }, [])

    return <div>

       
        
        <MuiDialog />
        <Body/>
        <Navbar2 />
        <Footer_loggedout/>
        <SupportChat />
    </div>;
}

export default Homepage;