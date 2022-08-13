import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
// import SupportWindow from './SupportWindow'
import ChatBox from "../components/Chatbox";

import Avatar from "../components/Avatar";

const SupportEngine = () => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const [visible, setVisible] = useState(false)

    const[convo, setConvo] = useState({})

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setVisible(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }


//     const [userId, setuserId] = useState();
// useEffect(()=> {
//   let data = sessionStorage.getItem('myUser')
//   data = JSON.parse(data)
//   setuserId (data._id);



// }, [])
    var currentid = '62e6d91a0674d0d029a0dd1f'

    useEffect(() => {
        let data = sessionStorage.getItem('myUser')
        data = JSON.parse(data)
        
        axios.get("http://localhost:9005/api/convo/"+ data._id).then((response) => {
            setConvo(response.data[0])
        })
        // const loadConvo = async () => {
        //   const response = await axios.get('https://luminious-liquor.herokuapp.com/api/convo/' + currentid);
        //   //console.log(response.data);
        //   setConvo(response.data[0]);
        // };
        // loadConvo();
    },[]);

    console.log(convo)

    return (
        <div ref={wrapperRef}>
            <ChatBox visible={visible} convo={convo}/>

            <Avatar 
                onClick={() => setVisible(true)}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                }}
            />
        </div>
    )
}

export default SupportEngine;