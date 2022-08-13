import React, {useState, useEffect} from "react";
// importing Link from react-router-dom to navigate to 

// different end points.
import Details from '../../components/details/details';
import Details2 from '../../components/details/details2';
import Footer from '../../components/footer/footer';
import Navbar2 from '../../components/navbar/navbar';
import Navbar_loggedout from '../../components/navbar/navbar_loggedout';
import Cart from '../cart/cart'
import { Link } from "react-router-dom";
import './home.css'

  
const Home = () => {

  const [check, setCheck] = useState(false);


  useEffect(()=> {
    let data = sessionStorage.getItem('myUser')
    data = JSON.parse(data)

    if(data==null){
      setCheck(false)
    }else{
      setCheck(true)
    }
}, [])



  return (
    <div>

<div className="navi">
  <p>Luminous Liquor</p>
</div>
 
<div className="navo">
{(() => {
        if (check==true) {
          return (
            <Navbar2 />
          )
        }
        else {
          return (
            <Navbar_loggedout />
          )
        }
      })()}
     </div>

     <div className="nava">
      <Details2 />
      {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Home