import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import './rightcomp.css';
import { Link } from 'react-router-dom';
import Baggreen from '../images/baggreen.png'
import Axios from 'axios'

const Rightcomp = () =>{

  const [check, setCheck] = useState(false);
  const [userId, setuserId] = useState();

  useEffect(()=> {
    let data = sessionStorage.getItem('myUser')
    data = JSON.parse(data)

    if(data==null){
      setCheck(false)
  
    }
    else {
     setCheck(true)
     setuserId(data._id);
    //  alert(userId)
 
    }
    
    
}, [])

const [cartList, setCartList] = useState([]);
useEffect(()=> {
  Axios.get("https://luminious-liquor.herokuapp.com/readCart/"+userId).then((response)=>{
  setCartList(response.data);
  console.log(response.data);
  console.log(cartList);
  })
}, [cartList])



    // const [sidebar, setSidebar] = useState(false);

    // const showSidebar = () => setSidebar(!sidebar);

    return(
        <>
        <div className='rightbar'>


{(() => {
        if (check==true) {
          return (
            <div id="yes">
            <a href="/cart">
            <img src={Baggreen}></img>
            <div className="counte">{cartList.length}</div>
            </a>
            </div>
          )
        }
        else {
          return (
            <div id="yes">
            <a href="/cartguest">
          <img src={Baggreen}></img>
          <div className="counte">{cartList.length}</div>
         
          </a>
          </div>
          )
        }
      })()}
         
        </div>
       
        </>
    )
}
export default Rightcomp;