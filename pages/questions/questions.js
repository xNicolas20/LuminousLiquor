import Navbar from '../../components/navbar/navbar';
import './questions.css';
import {useState, useEffect} from "react";
import Axios from 'axios'
import React from 'react';
import { useParams } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Navbar_loggedout from '../../components/navbar/navbar_loggedout';
import Leftcomp from '../../components/leftcomp/leftcomp'
import Rightcomp from '../../components/rightcomp/rightcomp'




const Questions  = () => {


 
  const [check, setCheck] = useState(false);


  useEffect(()=> {
    let data = sessionStorage.getItem('myUser')
    data = JSON.parse(data)
    if(data!=null){
    setCheck(true);
   
    }
    else{
      setCheck(false);
    }
  
  
  })





    return (

    <div>
  
  {check?(<Navbar />):
  (<Navbar_loggedout />)
  }


<div class="jumbotron check-cover text-white">
    <div class="container py-5 text-center">
        <h2 class="display-4 font-weight-bold">Frequently Asked Questions</h2>
        {/* <p class="font-italic mb-0">Using simple jumbotron-style component, create a nice Bootstrap 4 header with a background image.</p>
        <p class="font-italic">Snippe by
            <a href="https://bootstrapious.com" class="text-white">
                <u>Bootstrapious</u>
            </a>
        </p> */}
        {/* <a href="#" role="button" class="btn btn-primary px-5">See All Features</a> */}
    </div>
</div>





<div className='containe'>




<Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Can I track my Order?</Accordion.Header>
        <Accordion.Body>
          Unfortunately, no. However you may call or email us regarding any query on delivery.
        </Accordion.Body>
      </Accordion.Item>


      <Accordion.Item eventKey="1">
        <Accordion.Header>Where is store located?</Accordion.Header>
        <Accordion.Body>
        507 10th Ave Bay A, Carstairs, AB T0M 0N0
        </Accordion.Body>
      </Accordion.Item>


      <Accordion.Item eventKey="2">
        <Accordion.Header>How to Pay Online?</Accordion.Header>
        <Accordion.Body>
        507 10th Ave Bay A, Carstairs, AB T0M 0N0
        </Accordion.Body>
      </Accordion.Item>


      <Accordion.Item eventKey="3">
        <Accordion.Header>Can I still pay in person?</Accordion.Header>
        <Accordion.Body>
        Absolutely! Come into the store and we will be assist you in buying.
        </Accordion.Body>
      </Accordion.Item>


    </Accordion>
</div>



<Leftcomp />
<Rightcomp />

</div>




    )
}

export default Questions;