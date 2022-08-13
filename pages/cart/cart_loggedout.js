import Navbar from '../../components/navbar/navbar';
import './cart_loggedout.css';
import {useState, useEffect} from "react";
import Axios from 'axios'
import image from "../../components/images/wine.png";
import { useLocation } from 'react-router';
import Heart from "../../components/images/heart.png";
import HeartFilled from "../../components/images/heartFilled.png";
import GooglePayButton from "@google-pay/button-react";
import React from 'react';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Bag from '../../components/images/bag.png'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Navbar_loggedout from '../../components/navbar/navbar_loggedout';
import Leftcomp from '../../components/leftcomp/leftcomp'
import Rightcomp from '../../components/rightcomp/rightcomp'




const Fav_loggedout = () => {

//Variables
    const total = 0;
    const a = 0;
    

//Fetching the Parametrs
    let param = useParams();
    console.log(param);


// Declaring UseStates
    const [productInfoList, setproductInfo] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [addedFav, setAddFav] = useState([]);
    const [counter, setCounter] = useState(parseInt(1));
    const [favInfoList, setFavInfoList] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(()=> {
      Axios.get("https://luminious-liquor.herokuapp.com/readCart").then((response)=>{
      setCartList(response.data);
      })
    }, [cartList])

 
    useEffect(()=> {

        
  
          Axios.get("https://luminious-liquor.herokuapp.com/readFav/" + 2).then((response)=>{
              setFavInfoList(response.data);
              setFilteredData(response.data);
             
              })
           


      
     
  }, [favInfoList])


  function handleRemove (id) {
// alert(id)
    Axios.post("https://luminious-liquor.herokuapp.com/delFav/" + id)
      

        
  
      Axios.get("https://luminious-liquor.herokuapp.com/readFav/" + 2).then((response)=>{
          setFavInfoList(response.data);
          setFilteredData(response.data);
         
          })
       





  }


    return (
    <div>
  
<Navbar_loggedout />

<div class="jumbotron check-cover text-white">
    <div class="container py-5 text-center">
        <h2 class="display-4 font-weight-bold">Cart</h2>
        {/* <p class="font-italic mb-0">Using simple jumbotron-style component, create a nice Bootstrap 4 header with a background image.</p>
        <p class="font-italic">Snippe by
            <a href="https://bootstrapious.com" class="text-white">
                <u>Bootstrapious</u>
            </a>
        </p> */}
        {/* <a href="#" role="button" class="btn btn-primary px-5">See All Features</a> */}
    </div>
</div>





<div className='container bo'>







<div class="shopping-ca">


<div className='reqf'><a href="/login">Sign in to see your cart</a></div>



</div>
</div>

{/* <div id="ct">
  + Add more Products
</div> */}

<Leftcomp />
<Rightcomp />

</div>
    )
}

export default Fav_loggedout;