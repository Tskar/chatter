import React, { useRef, useEffect } from "react"
import './chat.css'
import { useAuth } from "../../Context/AuthContext";
import { useChatAuth } from "../../Context/ChatContext";


const Chat = ({message}) => {

  const { currentUser } = useAuth();
  const { data } = useChatAuth();
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className={`chat ${message.senderId === currentUser.uid && "owner"}`}>
        <div className="chat-sender">
            <img src={message.senderId === currentUser.uid ? currentUser.photoURL: data.user.photoURL} alt=""></img>
        </div>
        <div className="chat-value">
            <p>{message.text}</p>
        </div>
    </div>
  )
};

export default Chat;
 