import {useState, useEffect} from "react";
import Heart from "../images/heart.png";
import HeartFilled from "../images/heartFilled.png";
import Back from "../images/back.png";
import Cart from "../images/bag.png";
import Axios from 'axios'
import "./details2.css"
import image from "../images/wine.png";
import del from "../images/delivery-truck.png";
import money from "../images/money.png";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { Link, useNavigate } from "react-router-dom";
import GooglePayButton from "@google-pay/button-react";
import React from 'react';
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Leftcomp from '../../components/leftcomp/leftcomp'
import Rightcomp from '../../components/rightcomp/rightcomp'
import { set } from "mongoose";
import BagEmpty from "../images/bagempty.png";
import BagFilled from "../images/bagfilled.png"
import Real_footer from "../../homepage/components/real_footer";
import Navbar2 from "../navbar/navbar";





const Details2 = (props) => {

 
  let id = useParams();
    console.log(id.id);

    const navigate = useNavigate();
  

  const data = {
    id: 1,
    name: 'balle'
  }
    
   
  const [counter, setCounter] = useState(1);
    const [added, setAdd] = useState(false);
    const [addedFav, setAddFav] = useState([]);
    const [checkcart, setCheckCart] = useState([]);
    const [addedCart, setAddCart] = useState(false);
    const [zipCode, setZipCode] = useState("");
    const [favList, setFavList] = useState([]);

    const [productInfoList, setproductInfo] = useState([]);

    const [productSizeList, setproductSize] = useState([]);
    const [high, setHigh] = useState(0);
    const [price, setPrice] = useState(0);
    const slideIndex = 1;


    const [addLabel, setAddLabel] = useState("Add to Cart");

    // Checking if the user is in session
    const [check, setCheck] = useState(false);

    const [userId, setuserId] = useState();

    useEffect(()=> {
      let data = sessionStorage.getItem('myUser')
      data = JSON.parse(data)
      if(data!=null){
      setuserId(data._id);
      setCheck(true);
     
      }
      else{
        setCheck(false);
      }
    
    
    })


        useEffect(()=> {
          productInfoList.map((val, key) =>
                   
                 
          setPrice(val.price),
           );
          },)




// Fetching Product Info
    useEffect(()=> {
            Axios.get("https://luminious-liquor.herokuapp.com/productInfo/" + id.id).then((response)=>{
            setproductInfo(response.data);
            console.log(response.data);
            })
         
        }, [setproductInfo])


// Reading if the product is in cart or not
    useEffect(()=> {
        Axios.get("https://luminious-liquor.herokuapp.com/readCart/"+id.id+ '/' + userId).then((response)=>{
      
        setCheckCart(response.data);

        if(checkcart.length==0)
        {
          setAddCart(false);
          setAddLabel("Add to Cart");
        }
        else
        {
          setAddCart(true);
          setAddLabel("Added in Cart");
        } 

      })
         
      }, [checkcart]
    )



    // Reading if the product is in fav or not
    useEffect(()=> {
      Axios.get("https://luminious-liquor.herokuapp.com/readFav/"+id.id+ '/' + userId).then((response)=>{
    
      setAddFav(response.data);

      if(addedFav.length==0)
      {
        setAdd(false);

      }
      else
      {
        setAdd(true);
      }

    })
       
    }, [addedFav]
  )


    const [showA, setShowA] = useState(true);
    const [showB, setShowB] = useState(true);
  
    const toggleShowA = () => setShowA(!showA);
    const toggleShowB = () => setShowB(!showB);


    const handleAdd = () =>{
       if (added){
        Axios.post("https://luminious-liquor.herokuapp.com/delFav/"+id.id+'/'+userId)
        setOpenCart(false);
           setAdd(false);
           setremoveFav(true)
           setOpenFav(false)

       }
       else{
        setOpenCart(false);
           setAdd(true);
          setOpenFav(true);
          setremoveFav(false);
          //  alert(userId)
           productInfoList.map((val, key) =>
         
       
           Axios.post("https://luminious-liquor.herokuapp.com/favourite/"+val.prodId+'/'+ userId +'/'+val.name+'/'+val.description+'/'+val.price),
         
           );



            // Axios.post("https://luminious-liquor.herokuapp.com/favourite")
            // Axios.post("http://localhost:3010/product")
         
       }
    };

    const CartButton = () => {


if(addedCart==true){

    setAddCart(false);
    setOpenCart(false);
    setOpenFav(false)
    setremoveFav(false);
    setRemoveCart(true);

    Axios.post("https://luminious-liquor.herokuapp.com/delCart/"+id.id+'/'+userId)
    setAddLabel("Add to Cart")
}
else{

setAddCart(true);
    setAddLabel("Added in Cart");
    setOpenCart(true);
    setOpenFav(false)
    setremoveFav(false);
    setRemoveCart(false);

    productInfoList.map((val, key) =>
         
          
    Axios.post("http://localhost:9005/cart/"+val.prodId+'/'+ userId +'/'+val.name+'/'+val.description+'/'+val.price)
  );

 } }
    

//     const deleteFav = (uId, pId) =>{
// Axios.delete(`http://localhost:3002/delete/${uId}+${pId}`)
//     }



    function checkDelivery(array, name){
        var hours = new Date().getHours();

        // return array.find((element) => {
        //     return element.time === time;
        //   })

          const found = array.find(obj => 
            obj.id === name
          );
        
          console.log("Reached");
        console.log(found);
    }

    function getZip(event)
    {
        console.log(event.target.value);
        setZipCode(event.target.value);
    }


    //Adding into the counter

    const [quantity, setQuantity] = useState(0);
    const handleCounterAdd = () => {
      productInfoList.map((val, key) =>
      setHigh(val.quantities),
     
    );

    
    if(counter<high){
          setCounter(counter+1)
    }

    // else{
    //       setOpen(true)
          
    // }
    }


    //Subracting the Counter
    const handleSub = () => {
      if(counter>0)
      setCounter(counter-1)
    }


    //Showing the high error message
    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });




    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };



    //For adding fav
    const [openFav, setOpenFav] = React.useState(false);
    const handleCloseFav = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenFav(false);
    };
    

    //For removing favourites
    const [removeFav, setremoveFav] = React.useState(false);
    const handleCloseFav2 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setremoveFav(false);
    };

    //
    const [openNoFav, setOpenNoFav] = React.useState(false);

  const handleClickNoFav = () => {
    setOpenNoFav(true);
  };

  const handleCloseNoFav = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenNoFav(false);
  };


  function noFav(){
    
    setOpenNoCart(false);
    setOpenNoFav(true);
    setOpenCart(false);
    setRemoveCart(false);
  }


  //
  const [openNoCart, setOpenNoCart] = React.useState(false);

  const handleClickNoCart = () => {
    setOpenNoCart(true);
  };

  const handleCloseNoCart = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenNoCart(false);
  };


  function noCart(){
    setOpenNoFav(false);
    setOpenNoCart(true);
    setOpenCart(false);
    setRemoveCart(false);
   
  }



  //
  const [openCart, setOpenCart] = React.useState(false);

  const handleClickCart = () => {
    setOpenCart(true);
  };

  const handleCloseCart = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenCart(false);
   
  };

  useEffect(()=> {
    // alert("enetered")
    Axios.get("http://localhost:9005/productprice/" + id.id).then((response)=>{
      // alert("enetered")
      setPrice(response.data.price)
      // alert(price)
     
   })


   
  
    //  alert(price)

     },)


   //
   const [removeCart, setRemoveCart] = React.useState(false);

   const handleClickCart2 = () => {
     setRemoveCart(true);
   };
 
   const handleCloseCart2 = (event, reason) => {
     if (reason === 'clickaway') {
       return;
     }
 
     setRemoveCart(false);
    
   };


    //
    const [openCheckout, setOpenCheckout] = React.useState(false);

    const handleClickChecout = () => {
      setOpenCheckout(true);
    };
  
    const handleCloseCheckout = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenCheckout(false);
     
    };
 
 




    //Navigating to checkout page
    const toComponentB=()=>{

      if(check){
      navigate('/checkout',{state:{id:id.id,quantity:counter,price:price}});
      }
      else{
        setOpenCheckout(true);
      }
        }

        return(
        
          <div>


        

          <div className="conta">


      

          {/* <LoadingBar /> */}
          
          <div className="picture_side">
          
          {/* <Button className="butback" onClick={()=>{navigate('/')}}>
          <img src={Back} className="favIcon_product back" />
          </Button> */}
              <Zoom className="zoo">
              <img className="picture_pic" src={image} alt=""></img>
              </Zoom>
          
          
              <div className="addToCart_product">
                <label id="xoom">Click the image to Zoom</label>
                <br></br>
          
              {check?(
              addedCart?(
                
              <img src={BagFilled} className="favFilled_product" onClick={CartButton}/>
                    
              ):
              (
                <img src={BagEmpty} className="favFilledIcon_product" onClick={CartButton}/>
                     
              )
              ):(
                <img src={BagEmpty} className="favFilledIcon_product" onClick={noCart}/>
          )}
          
          <div className="favourite_product">
          
          {check?(
          
          added? (
          <img src={HeartFilled} className="favFilledIcon_product" onClick={handleAdd}/>
          ) : 
                          
          (
          
           
              <img src={Heart} className="favIcon_product" onClick={handleAdd}/>
              
          )
          
          ):(
          <img src={Heart} className="favIcon_product" onClick={noFav}/>
          
          )}
          
          
                          
                      </div>
                  </div>
          
            </div>
          
          
            <div class="right-column">
           
           <div class="myProduct">
               {/* <label>Category </label> */}
          
          
               {productInfoList.map((val,key) => {
                 
              
              return (
          
          <div>
             
             <label id="category_link">{val.category}</label>
             
          
          
             <h1 id="product_title">{val.name}</h1>
             {/* <h3 id="priceHide">${val.price}</h3> */}
             <p className="product_descripti">{val.description}</p>
             </div>
          
          
             );
          })}   
           
           </div>
          
           <div class="product-configuration">
          
             {/* <div class="product-color">
               <span>Color</span>
          
               <div class="color-choose">
                 <div>
                   <input data-image="red" type="radio" id="red" name="color" value="red" checked></input>
                   <label for="red"><span></span></label>
                 </div>
                 <div>
                   <input data-image="blue" type="radio" id="blue" name="color" value="blue"></input>
                   <label for="blue"><span></span></label>
                 </div>
                 <div>
                   <input data-image="black" type="radio" id="black" name="color" value="black"></input>
                   <label for="black"><span></span></label>
                 </div>
               </div>
          
             </div> */}
          
          <div class="resConfig">
             <div class="cable-config adjleft">
                  <span>Size</span>
           <br></br><br></br>
                  <div class="cable-choose">
          
                  {productInfoList.map((val,key) => {
              
              return (
          
                    <div className="sizeShow">{val.size}ml</div>
          
                    );
                  })}   
                    
                  </div>
           
                  {/* <a href="#">How to configurate your headphones</a> */}
                </div>
          
          <div className="separate"></div>
                <div class="cable-config adjright">
                  <span>Quantity</span>
                  <br></br>
                  <br></br>
           <div className="count_product">
               <div>
               
               <button className="plus_but float-left-child" onClick={handleCounterAdd}>+</button>
               <label className="counter_but float-left-child">{counter}</label>
          <button className="minus_but" onClick={handleSub}>-</button>
          </div>
          </div>
          </div>
          
          <div className="err-message">
            {/* <label>Unfortunately, we have only 10 items left</label> */}
            <Stack spacing={2} sx={{ width: '100%' }}>
               
               <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                 <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  Unfortunately, we have only {high} items left
                 </Alert>
                 
               </Snackbar>
               </Stack>
          
          <Stack>
               <Snackbar open={openFav} autoHideDuration={2000} onClose={handleCloseFav}>
               <Alert onClose={handleCloseFav} severity="success" sx={{ width: '100%' }}>
                 1 item added to favourites
                 </Alert>
          </Snackbar>
          <Snackbar open={removeFav} autoHideDuration={2000} onClose={handleCloseFav2}>
               <Alert onClose={handleCloseFav2} severity="warning" sx={{ width: '100%' }}>
                 1 item removed from favourites
                 </Alert>
          </Snackbar>
          <Snackbar open={openCart} autoHideDuration={2000} onClose={handleCloseCart}>
               <Alert onClose={handleCloseCart} severity="success" sx={{ width: '100%' }}>
                 1 item added to cart
                 </Alert>
          </Snackbar>
          <Snackbar open={removeCart} autoHideDuration={2000} onClose={handleCloseCart2}>
               <Alert onClose={handleCloseCart2} severity="warning" sx={{ width: '100%' }}>
                 1 item removed from cart
                 </Alert>
          </Snackbar>
          <Snackbar open={openNoFav} autoHideDuration={2000} onClose={handleCloseNoFav}>
               <Alert onClose={handleCloseNoFav} severity="error" sx={{ width: '100%' }}>
                You must login to add favourites
                 </Alert>
          </Snackbar>
          <Snackbar open={openNoCart} autoHideDuration={2000} onClose={handleCloseNoCart}>
               <Alert onClose={handleCloseNoCart} severity="error" sx={{ width: '100%' }}>
                You must login to add to cart
                 </Alert>
          </Snackbar>

          <Snackbar open={openCheckout} autoHideDuration={2000} onClose={handleCloseCheckout}>
               <Alert onClose={handleCloseCheckout} severity="error" sx={{ width: '100%' }}>
                You must login to add to checkout
                 </Alert>
          </Snackbar>
          </Stack>
          
          </div>
           </div>
          
                
          
          
          
          
          
              </div>
           
          
          {/*  
              <div className="addToCart_product">
                  <button className="cartBut" value="Add to Cart" onClick={CartButton}><label id="changeText">Add to Cart </label></button>
                  <div className="favourite_product">
                          {added? (<img src={HeartFilled} className="favFilledIcon_product" onClick={handleAdd}/>) : 
                          
                          (
                              <img src={Heart} className="favIcon_product" onClick={handleAdd}/>
                          )}
                          
                      </div>
                  </div> */}
          
          
          
           
          
              <div class="product-price_details">
              {productInfoList.map((val,key) => {
              
              return (
          
                    <span id="hidePrice">${val.price}</span>
          
                    );
                  })}  
                
                
          
               
          {/* <Link to={{
                pathname: '/checkout/'+ counter+ '/' + id.id,
              }} ><a href="#" class="cart-btn">Checkout</a>
              </Link> */}
           
          
         

          <a  class="cart-btn" onClick={()=>{toComponentB()}}>
          Checkout
          </a>

              
                
              </div>
            </div>
          
           
         
            </div>
            <Leftcomp />
            <Rightcomp />
            <Real_footer />
          
          </div>
          
          
            
          
          
          
                  
          
                 
          
          
              )
          }
          
          export default Details2;