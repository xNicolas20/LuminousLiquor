import Navbar from '../../components/navbar/navbar';
import './checkout.css';
import {useState, useEffect} from "react";
import Axios from 'axios'
import image from "../../components/images/wine.png";
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
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import Leftcomp from '../../components/leftcomp/leftcomp'
import Rightcomp from '../../components/rightcomp/rightcomp'
import { Button } from '@mui/material';





const Checkout  = () => {

//Variables
    const total = 0;
    const a = 0;
    const location = useLocation();
    

//Fetching the Parametrs
    let param = useParams();
    console.log(param);


// Declaring UseStates
    const [productInfoList, setproductInfo] = useState([]);
    const [postalList, setpostalList] = useState([]);
    const [mypost, setpostal] = useState('');
    const [feedback, setfeedback] = useState('');
    const [cartList, setCartList] = useState([]);
    const [addedFav, setAddFav] = useState([]);
    const [counter, setCounter] = useState(parseInt(location.state.quantity));
    const [price, setPrice] = useState(location.state.price);
    const [high, setHigh] = useState(0);

    const navigate = useNavigate();
    
//Fetching all the details of Checked Out Product
  useEffect(()=> {
    
    Axios.get("https://luminious-liquor.herokuapp.com/productInfo/" + location.state.id).then((response)=>{
    setproductInfo(response.data);
   
 })

    
    
}, [setproductInfo])


        // useEffect(()=> {
        //   // alert("enetered")
        //   Axios.get("http://localhost:9005/productprice/" + location.state.id).then((response)=>{
        //     // alert("enetered")
        //     setPrice(response.data.price)
        //     alert(price)
           
        //  })


         
        
        //   //  alert(price)
 
        //    },)




const toComponentB=()=>{
  navigate('/pay',{state:{sub:subTotal,ship:shipping,tax: tax, grand: grandTotal}});
    }


// function prices(){
// productInfoList.map((val, key) =>
// // Only do this if items have no stable ID

// setPrice(val.price)

// );
  


// }



const handleChange = event => {
  setpostal(event.target.value);

};






var payPrice = "25.98";





    

 
    
   
    
    const [subTotal, setSubTotal] = useState(((price*parseInt(location.state.quantity)).toFixed(2)) );
    const [shipping, setShipping] = useState(5);
    const [tax, setTax] = useState(parseFloat((0.05*subTotal).toFixed(2)));
    const [grandTotal, setGrandTotal] = useState(parseFloat((subTotal + shipping + tax)).toFixed(2));
    


    const handleCounterAdd = () => {
      
      productInfoList.map((val, key) =>
      setHigh(val.quantities)
    
    );
  
   if(counter<high){
      setCounter(counter+1)
      setSubTotal(parseFloat(((counter+1)* price).toFixed(1)))
      setTax(parseFloat((0.05 * ((counter+1)* price)).toFixed(1)))
      setGrandTotal(((counter+1)* price + shipping + (0.05 * (counter+1)* price)).toFixed(2))
      
      payPrice = ((((counter+1)* price + shipping + (0.05 * (counter+1)* price))).toFixed(2))
      
   
   }

    }

    const handleSub = () => {

      if((counter-1)>0){
      setCounter(counter-1)
      setSubTotal(parseFloat(((counter-1)* price).toFixed(1)))
      setTax(parseFloat((0.05 * ((counter-1)* price)).toFixed(1)));
      setGrandTotal(((counter-1)* price + shipping + (0.05 * (counter-1)* price)).toFixed(2))

      payPrice = ((((counter-1)* price + shipping + (0.05 * (counter-1)* price))).toFixed(2))
   
    
      }
    }
  

    // useEffect(()=> {
    //     Axios.get("http://localhost:4010/readCart").then((response)=>{
    //     setCartList(response.data);
    //     })
        
    // }, [cartList.length])

  
    const [targetValue, setTargetValue] = useState(1);
   


    return (
    <div>
  
<Navbar />

<div class="jumbotron  text-white check-cover">
    <div class="container py-5 text-center">
        <h2 class="display-4 font-weight-bold">Checkout</h2>
        {/* <p class="font-italic mb-0">Using simple jumbotron-style component, create a nice Bootstrap 4 header with a background image.</p>
        <p class="font-italic">Snippe by
            <a href="https://bootstrapious.com" class="text-white">
                <u>Bootstrapious</u>
            </a>
        </p> */}
        {/* <a href="#" role="button" class="btn btn-primary px-5">See All Features</a> */}
    </div>
</div>



<div class="container asd">
  <div class="row asd">
						<div class="col-12 col-md-10 hh-grayBox pt45 pb20">
							<div class="row justify-content-between">
								<div class="order-tracking completed">
									<span class="is-complete"></span>
									<p>Checkout<br></br></p>
								</div>
								<div class="order-tracking">
									<span class="is-complete"></span>
									<p>Payment<br></br></p>
								</div>
								<div class="order-tracking">
									<span class="is-complete"></span>
									<p>Confirmation<br></br></p>
								</div>
							</div>
						</div>
					</div>
</div>


<div className='conta'>



<div className="let_pay">
<label id="yourt">Item to purchase</label>
<div className="outer_left">

    

       

<div class="column-labels">
  <label class="product-image">Image</label>
  <label class="product-details">Product</label>
  <label class="product-price_checkout">Price</label>
  <label class="product-quantity">Quantity</label>
  {/* <label class="product-removal">Favourites</label>  */}
  <label class="product-line-price">Total</label>
</div>



<div class="product_checkout">




  <div class="product-image">

<Button className="shakeme" onClick={()=>{navigate('/product/'+location.state.id)}}>
    <img src={image}></img>
    </Button>
  </div>


  <div class="product-details">

  {productInfoList.map((val,key) => {
    
    return (

      <div>
      <div class="product-tit">{val.name}</div>

      <p class="product-descript">{val.description}</p>
    </div>
          

          );
        })}   

  
  </div>



  {productInfoList.map((val,key) => {
    
    return (

      <div>
       <div class="product-price_checkout">{val.price}</div>
    </div>
          

          );
        })}   



  <div class="prod-quantity">

<div>
     
     <button className="plus_but float-left-child" onClick={handleCounterAdd}>+</button>
     <label className="counter_but float-left-child">{counter}</label>
<button className="minus_but" onClick={handleSub}>-</button>
</div>
  </div>


  <div class="product-line-price">{subTotal}</div>
</div>

<div class="pr">
   <a id="view_but" href={"/"+param.id}>View</a>
  </div>
 








           


        



    </div>

</div>

<div className="rt_pay">


{/* <div className="totals">
    <div class="totals-item">
      <label>Subtotal</label>
      <div class="totals-value" id="cart-subtotal">${subTotal}</div>
    </div>
    <div class="totals-item">
      <label>Tax (5%)</label>
      <div class="totals-value" id="cart-tax">${tax}</div>
    </div>
    <div class="totals-item">
      <label>Shipping</label>
      <div class="totals-value" id="cart-shipping">${shipping}</div>
    </div>
    <div class="totals-item totals-item-total">
      <label>Grand Total</label>
      <div class="totals-value" id="cart-total">${grandTotal}</div>
    </div>
  </div> 

{/* 
<div class="container">
  <div class="row">
    <div class="col-*-*"></div>
    <div class="col-*-*"></div>
  </div>
  <div class="row">
    <div class="col-*-*"></div>
    <div class="col-*-*"></div>
    <div class="col-*-*"></div>
  </div>
  <div class="row">
    ...
  </div>
</div> */}


<label id="yourt">Your Total</label>
<Table responsive>
      <thead>
        <tr>
          <th>Subtotal</th>
          <td>${subTotal}</td>
        </tr>
      </thead>

      <thead>
        <tr>
          <th>Tax</th>
          <td>${tax}</td>
        </tr>
      </thead>

      <thead>
        <tr>
          <th>Shipping</th>
          <td>${shipping}</td>
        </tr>
      </thead>

      <thead>
        <tr>
          <th>Total</th>
          <td>${grandTotal}</td>
        </tr>
      </thead>
      
    </Table>



<div>

 {/* <GooglePayButton

environment='TEST'
paymentRequest={{
  apiVersion: 2,
  apiVersionMinor:0,
 allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: 'BCR2DN4T7S4K3TA4',
      merchantName: 'Luminous liquor',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: googlePay,
      currencyCode: 'CAD',
      countryCode: 'CA',
    },
    shippingAddressRequired: true,
    callbackIntents: ['PAYMENT_AUTHORIZATION']
   }}
   onLoadPaymentData={paymentRequest => {
     alert('Sucess', paymentRequest);
   }}
   onPaymentAuthorized={paymentData => {
     alert("Payment Authorized Success", paymentData)
     return {transactionState: 'success'}
   }}
   existingPaymentMethodRequired='false'
   buttonColor='white'
   buttonType='Buy'
     /> */}


{/* 
<GooglePayButton className='payBut'
  environment="TEST"
  paymentRequest={{
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: 'BCR2DN4T7S4K3TA4',
      merchantName: 'Luminous liquor',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '100.00',
      currencyCode: 'USD',
      countryCode: 'US',
    },
    shippingAddressRequired: true,
  }}

  
  onLoadPaymentData={paymentRequest => {
    alert("Success");
  }}
/>
*/}

</div> 



{/* 
  <GooglePlayButton
environment='TEST'
paymentRequest={{
  apiVersion: 2,
  apiVersionMinor:0,
 allowedPaymentsMethods: [
{
  type: 'CARD',
  parameters: {
    allowedPaymentsMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
    allowedCardNetworks: ['MASTERCARD', 'VISA'],
  },
  tokenizationSpecification: {
    type: 'PAYMENT_GATEWAY',
    parameters: {
      gateway: 'example',
      gatewayMerchantId: 'BCR2DN4T7S4K3TA4',

    }
  }
}
 ],
 merchantInfo: {
   merchantId: 'BCR2DN4T7S4K3TA4',
   merchantName: 'Guryuvraj',
 },
 transactionInfo:{
   totalPriceStatus: 'FINAL',
   totalPriceLabel: 'Total',
   totalPrice: '1',
   currencyCode: 'CAD',
   countryCode: 'ca',
 },
 shippingAddressRequired: true,
 callbackIntents: ['PAYMENT_AUTHORIZATION']
}}
onLoadPaymentData={paymentRequest => {
  alert('Sucess', paymentRequest);
}}
onPaymentAuthorized={paymentData => {
  alert("Payment Authorized Success", paymentData)
  return {transactionState: 'success'}
}}
existingPaymentMethodRequired='false'
buttonColor='black'
buttonType='Buy'
  ></GooglePlayButton> */}

</div>
<div id="ctr">

<a onClick={()=>{toComponentB()}}>
Pay ${grandTotal}
</a>
</div>
</div>

<div id="ct">

<a onClick={()=>{toComponentB()}}>
Pay ${grandTotal}
</a>
</div>



     <Leftcomp />
     <Rightcomp />

</div>
    )
}

export default Checkout;