import Navbar from '../../components/navbar/navbar';
import './pay.css';
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
import {useLocation} from 'react-router-dom';
import Leftcomp from '../../components/leftcomp/leftcomp'
import Rightcomp from '../../components/rightcomp/rightcomp';
import {useNavigate} from 'react-router-dom';






const Pay  = () => {

//Variables
    const total = 0;
    const a = 0;
    const navigate = useNavigate();
    const location = useLocation();

//Fetching the Parametrs
    let param = useParams();
    console.log(param);

   


// Declaring UseStates
    const [productInfoList, setproductInfo] = useState([]);
    const [postalList, setpostalList] = useState([]);
    const [mypost, setpostal] = useState('');
    const [feedback, setfeedback] = useState('');
  
    const [myEmail, setEmail] = useState('');
    const [readPost, setPost] = useState('');
    const [address, setAddress] = useState('');
    const [cartList, setCartList] = useState([]);
    const [addedFav, setAddFav] = useState([]);
    const [counter, setCounter] = useState(parseInt(param.quantity));
    const [price, setPrice] = useState(19.9);
    const [high, setHigh] = useState(0);
    const [dis, setDis] = useState(true);
    const [can, setCan] = useState(false);

   


// function prices(){
// productInfoList.map((val, key) =>
// // Only do this if items have no stable ID

// setPrice(val.price)

// );
  


// }


const [userName, setuserName] = useState('');
useEffect(()=> {
  let data = sessionStorage.getItem('myUser')
  data = JSON.parse(data)
  setuserName (data.name);
  setEmail(data.email);



}, [])

const handleChange = event => {
  setpostal(event.target.value);

};


const handleAddress = event => {
 
 
  setAddress(event.target.value);

};


const handlePostal = event => {
  setPost(event.target.value);




};





function check(){
  
    Axios.get("https://luminious-liquor.herokuapp.com/readpostal/" + readPost).then((response)=>{
    setpostalList(response.data);
   })

   
 
   alert(readPost)
   console.log(readPost)
   console.log(postalList)
  
  if(postalList.length == 0)
  {
    alert(postalList)
    setfeedback("Sorry, we don't deliver to this location")
setCan(false)
setDis(true);
  }
  else{
    alert(postalList)
    setCan(true)
    setDis(false);
    postalList.map((val, key) =>
  // Only do this if items have no stable ID
 
  setfeedback("We will deliver in " + val.time + " hours")

);

  }


}



var payPrice = "25.98";





    

 
    
   
    
    const [subTotal, setSubTotal] = useState((price*parseInt(param.quantity).toFixed(2)) );
    const [shipping, setShipping] = useState(5);
    const [tax, setTax] = useState(parseFloat((0.05*subTotal).toFixed(2)));
    const [grandTotal, setGrandTotal] = useState(((subTotal + shipping + tax)).toFixed(2));
  
    
    const [googlePay, setGooglePay] = useState("25.98");

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
      
      setGooglePay(payPrice)
   }

    }

    const handleSub = () => {

      if((counter-1)>0){
      setCounter(counter-1)
      setSubTotal(parseFloat(((counter-1)* price).toFixed(1)))
      setTax(parseFloat((0.05 * ((counter-1)* price)).toFixed(1)));
      setGrandTotal(((counter-1)* price + shipping + (0.05 * (counter-1)* price)).toFixed(2))

      payPrice = ((((counter-1)* price + shipping + (0.05 * (counter-1)* price))).toFixed(2))
   
      setGooglePay(payPrice)
      }
    }
   

    // useEffect(()=> {
    //     Axios.get("http://localhost:4010/readCart").then((response)=>{
    //     setCartList(response.data);
    //     })
        
    // }, [cartList.length])

  
    const [targetValue, setTargetValue] = useState(1);
   async function process(){
    navigate('/confirmation',{grand: location.state.grand});
  
     console.log("strtrt")
    //   Axios.post("https://luminious-liquor.herokuapp.com/order/"+4+'/'+location.state.grand+'/'+address+'/'+readPost+'/'+'Guryuvraj').then((res) => {
  
    // });





    //  Axios.post("https://luminious-liquor.herokuapp.com/sendme").then((res) => {
  
    // });




 
   }


    return (
    <div>
  
<Navbar />

<div class="jumbotron check-cover text-white">
    <div class="container py-5 text-center">
        <h2 class="display-4 font-weight-bold"><div>Pay Online</div></h2>
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
									<p>Cart<br></br></p>
								</div>
								<div class="order-tracking completed">
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
<label id="yourt">Your Details</label>
<div className="outer_left">

<div className="info">
  <p>Full Name <span className="red">
  *
</span></p>

<FloatingLabel
    className = "fbut"
        controlId="floatingInput"
        label={userName}
        
      >
          <Form.Control
          type="text"
          name="text"
          placeholder="T3J0M6"
          disabled
         />
      </FloatingLabel>

      <p>Email <span className="red">
  *
</span></p>


<FloatingLabel
    className = "fbut"
        controlId="floatingInput"
        label={myEmail}
        
      >
          <Form.Control
          type="text"
          name="text"
          placeholder="T3J0M6"
      
          
          disabled
         />
      </FloatingLabel>

<p> Street Address <span className="red">
  *
</span></p>



<FloatingLabel
    className = "fbut"
        controlId="floatingInput"
        label="Enter Address"
        
      >
          <Form.Control
          type="text"
          name="text"
          placeholder="T3J0M6"
          onChange={handleAddress}
          value={address}
          
         />
      </FloatingLabel>

      <p> Postal Code <span className="red">
  *
</span></p>

      <FloatingLabel
    className = "fbut"
        controlId="floatingInput"
        label="Postal Code"
        
      >
          <Form.Control
          type="text"
          name="text"
          placeholder="T3J0M6"
          onChange={handlePostal}
          value={readPost}
         />
      </FloatingLabel>

<button className='checkbuti' onClick={check}>Check</button>
<br></br>
  {feedback}





      </div>





           


        



    </div>

</div>

<div className="rt_pay">
<label id="yourt">Your Total</label>
<Table className="rp" responsive>
      <thead>
        <tr>
          <th>Subtotal</th>
          <td>${location.state.sub}</td>
        </tr>
      </thead>

      <thead>
        <tr>
          <th>Tax</th>
          <td>${location.state.tax}</td>
        </tr>
      </thead>

      <thead>
        <tr>
          <th>Shipping</th>
          <td>${location.state.ship}</td>
        </tr>
      </thead>

      <thead>
        <tr>
          <th>Total</th>
          <td>${location.state.grand}</td>
        </tr>
      </thead>
      
    </Table>

    <br></br>

    <div disabled={dis}>
    <GooglePayButton
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
            merchantId: '12345678901234567890',
            merchantName: 'Demo Merchant',
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: '1',
            currencyCode: 'USD',
            countryCode: 'US',
          },
          shippingAddressRequired: true,
          callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
        }}
        onLoadPaymentData={paymentRequest => {
          console.log('Success', paymentRequest);
          
        }}
        onPaymentAuthorized={paymentData => {
        
            console.log('Payment Authorised Success', paymentData)
            process()
            return { transactionState: 'SUCCESS'}
         
          }
        
        }
        onPaymentDataChanged={paymentData => {
            console.log('On Payment Data Changed', paymentData)
            return {  }
          } 

        }
        existingPaymentMethodRequired='false'
        buttonColor='black'
        buttonType='Buy'
      />



</div>


      {/* <button class="checkout" id='buy-now'>Checkout</button> */}

<div>


</div> 




</div>
</div>
<Leftcomp />
<Rightcomp />


</div>
    )
}

export default Pay;