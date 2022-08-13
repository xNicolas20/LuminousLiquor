import './chat.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Convo from './coversation'
import Messages from './messages';
import send from './send.png';




export default function Chat() {
  const[convo, setConvo] = useState([])
  const[currentChat, setCurrentChat] = useState({})
  const[messages, setMessages] = useState([])
  const[chat, setChat] =  useState("")


  
  
  var admin = '62d1de891f770f0cd301ac00'
  useEffect(() => {
    axios.get('https://luminous-liquor.herokuapp.com/api/convo/' + admin).then((response) => {
        setConvo(response.data)
        
    })
    // const loadConvo = async () => {
    //   const response = await axios.get('https://luminous-liquor.herokuapp.com/api/convo/' + currentid);
    //   //console.log(response.data);
    //   setConvo(response.data[0]);
    // };
    // loadConvo();
  },[]);

  useEffect(() => {
    axios.get('https://luminous-liquor.herokuapp.com/api/message/' + currentChat._id).then((response) => {
        setMessages(response.data)
    })
    // const loadMessage = async () => {
    //   const response = await axios.get('https://luminous-liquor.herokuapp.com/api/message/' + convo._id);
    //   setMessages(response.data);
    // };
    // loadMessage();
  });

  console.log(currentChat)
  console.log(convo)
  const sendMessage = (e) => {
    const message = {
        conversationId: currentChat._id,
        sender: admin,
        text: chat
    }
    axios.post('https://luminous-liquor.herokuapp.com/api/message/', message)
    setMessages([...messages, message])
    setChat("")
    e.preventDefault()
}

  console.log(messages)

  return (
    <div className='main__chatbody'>
        {/* <div className="productTitleContainer">
            <h1 className="productTitle">Luminous Liquor</h1>
        </div> */}
        <div className="main__chatlist">
        <div className="chatlist__heading">
         
          <button className="btn-nobg">
            <i className="fa fa-ellipsis-h"></i>
          </button>
        </div>

        <div className="chatlist__items">
          <h1>Chats</h1>
        {convo.map((c) => (
              <div className='chat-convo'
              onl
              onClick={() => setCurrentChat(c)}>
                  <Convo convo={c}/>
              </div>
            ))}
        </div>
      </div>
       
         <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
             
              <p>Chat Panel</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
        {messages.map(m => (
                    <Messages message={m} own={m.sender === admin}/>
              ))}
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
            <input className="input_message" type='text' placeholder="Enter your message here...." onChange={(e)=> setChat(e.target.value)} value={chat} required/>
            <button className="btnSendMsg" id="sendMsgBtn" onClick={sendMessage}>
              <img src={send} className="img_button" alt='send'/>
            </button>
          </div>
        </div>
      </div>
        </div>
    // </div>
  );
}