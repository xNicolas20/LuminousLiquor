import { useState, useEffect } from 'react';
import axios from 'axios';
import './conversation.css'

export default function Conversation(params) {
    const [user, setUser] = useState({})

    var admin = '62d1de891f770f0cd301ac00'
    useEffect(() => {
  
        const friend = params.convo.members.find((m) => m != admin)
        axios.get('https://luminous-liquor.herokuapp.com/edituser/' + friend).then((response) => {
            setUser(response.data)
           
            // alert("entered")
        })
        console.log(friend)
        // alert("out")
    },[])
    // console.log(params.convo.members)
    
  return (
    <div className="main__chatlist">
        <div className="chatlist__heading">
          
          <button className="btn-nobg">
            <i className="fa fa-ellipsis-h"></i>
          </button>
        </div>

        <div className="chatlist__items">
         <p className='chatlist__item '>{user.name}</p>
        </div>
      </div>
    // <div className='convo'>
    //    <p>{user.name}</p>
    // </div>
  );
}