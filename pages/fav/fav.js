import Navbar from '../../components/navbar/navbar';
import './fav.css';
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
import Leftcomp from '../../components/leftcomp/leftcomp'
import Rightcomp from '../../components/rightcomp/rightcomp'
import LoadingSpinner from "../../LoadingSpinner";




const Fav = () => {

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
    const [empty, setEmpty] = useState(true);
    const [loading, load] = useState(false);



    const [userId, setuserId] = useState();
    useEffect(()=> {
      let data = sessionStorage.getItem('myUser')
      data = JSON.parse(data)
      if(data!=null){
      setuserId(data._id);
     
      }
    
    
    })
 
    useEffect(()=> {
      
  Axios.get("https://luminious-liquor.herokuapp.com/readFav/" + userId).then((response)=>{
              setFavInfoList(response.data);
              setFilteredData(response.data);
              load(true);
             
              if(filteredData.length==0){

                setEmpty(true)
               
              }
              else{
                setEmpty(false)
                
            
              }

              })
           


      
     
  }, [favInfoList])


  function handleRemove (id) {
// alert(id)
    Axios.post("https://luminious-liquor.herokuapp.com/delFav/" + id+'/'+userId)
      


    Axios.get("https://luminious-liquor.herokuapp.com/readFav/" + userId).then((response)=>{
      setFavInfoList(response.data);
      setFilteredData(response.data);

      if(filteredData.length==0){
        setEmpty(true)
      }
      else{
        setEmpty(false)
      }

    
     
     
      })

        
  
       





  }


    return loading ? (
    <div>
  
<Navbar />

<div class="jumbotron check-cover text-white">
    <div class="container py-5 text-center">
        <h2 class="display-4 font-weight-bold">Favourites</h2>
        {/* <p class="font-italic mb-0">Using simple jumbotron-style component, create a nice Bootstrap 4 header with a background image.</p>
        <p class="font-italic">Snippe by
            <a href="https://bootstrapious.com" class="text-white">
                <u>Bootstrapious</u>
            </a>
        </p> */}
        {/* <a href="#" role="button" class="btn btn-primary px-5">See All Features</a> */}
    </div>
</div>



{empty? (

<div>
    <div className='emptyMessage'>
     
    Your favourites are empty
   
</div>


<div className="kt">
<a href="/homepage">
+ Add your first favourite
</a>
    </div>



    <div className="ikti">
    <a href="/homepage">
+ Add your first favourite
</a>
    </div>

    </div>
    ) : 
     (
    

    <div>
    <div className='container bo'>
    
    
    
    
    
    
    
    
    <div class="shopping-cart">
    
      <div class="column-labels">
        <label class="product-image">Image</label>
        <label class="product-details">Product</label>
        <label class="product-p">Remove</label>
        <label class="product-r">View</label>
        <label class="product-line-price">Price</label>
      </div>
    
      {filteredData.slice(0, 10).map((pm) => (
                        // <div className="drop-navbar">
          
    
      <div class="product-pro">
        <div class="product-image">
          <img src={image}></img>
        </div>
        <div class="product-details">
          <div class="product-title">{pm.name}</div>
           </div>
        <div class="product-price">
        <button class="remove-product" onClick={() => {handleRemove(pm.prodId)}} >
            Remove
          </button>
        </div>
       
        <div class="product-removal">
          
          <a class="view-product" href={"/product/"+pm.prodId}>
           View
          </a>
        </div>
        <div class="product-line-price">{pm.price}</div>
      </div>
    
        
        ))}
    
    
    
      
    
    </div>
    
    
    
    
    
    
    </div>
    
    <div className="kt">
    <a href="/homepage">
      + Add more Products
      </a>
    </div>
    
    <div className="kti">
    <a href="/homepage">
      + Add more Products
      </a>
    </div>
    
    </div>
       )}







<Leftcomp />
<Rightcomp />
</div>
    ): (
      <LoadingSpinner />
    );
 
}

export default Fav;