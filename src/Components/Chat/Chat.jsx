import React from "react"
import './chat.css'
import tempImg from '../../Images/App-logo.png'

const Chat = (props) => {
  return (
    <div className="chat owner">
        <div className="chat-sender">
            <img src={tempImg} alt=""></img>
        </div>
        <div className="chat-value">
            <p>This is the chat value.</p>
        </div>
    </div>
  )
};

export default Chat;
 