import React, { useState, useEffect } from "react"
//import { db } from "../../firebase";
import { styles } from "./styles";
import axios from 'axios';
import Messages from "./Messages";

import './Chatbox.css'

const ChatBox = (props) => {


    let currentid = '62c71d3d5c1ecfa17bb30c84'

    const[messages, setMessages] = useState([{}])
    //const[convo, setConvo] = useState(props.convo)
    const[chat, setChat] = useState("")
    const[sender, setSender] = useState("");

    // useEffect(() => {
    //     axios.get('https://luminious-liquor.herokuapp.com/api/convo/' + currentid).then((response) => {
    //         setConvo(response.data[0])
    //     })
    //     // const loadConvo = async () => {
    //     //   const response = await axios.get('https://luminious-liquor.herokuapp.com/api/convo/' + currentid);
    //     //   //console.log(response.data);
    //     //   setConvo(response.data[0]);
    //     // };
    //     // loadConvo();
    // },[]);

    useEffect(() => {
        axios.get('https://luminious-liquor.herokuapp.com/api/message/' + props.convo._id).then((response) => {
            setMessages(response.data)
            // alert(props.convo._id)
        })
        // const loadMessage = async () => {
        //   const response = await axios.get('https://luminious-liquor.herokuapp.com/api/message/' + convo._id);
        //   setMessages(response.data);
        // };
        // loadMessage();
    });

    const sendMessage = (e) => {
        const message = {
            conversationId: props.convo._id,
            sender: currentid,
            text: chat
        }
        axios.post('https://luminious-liquor.herokuapp.com/api/message/', message)
        setMessages([...messages, message])
        setChat("")
        e.preventDefault()
    }

    return (
        <div 
            className='transition-5'
            style={{
                ...styles.supportWindow,
                ...{ opacity: props.visible ? '1' : '0' }
            }}
        >
            <div className="chat-header">
                <h3>Chat Support</h3>
                <p>Available: 10am to 7pm</p>
            </div>
            <div className="chat-box">
                {messages.map(m => (
                    <Messages message={m} own={m.sender === currentid}/>
                ))}
            </div>
            <div className="chat-input">
                <input type='text' onChange={(e)=> setChat(e.target.value)} value={chat}/>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatBox;