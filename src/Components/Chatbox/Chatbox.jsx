import React from "react"
import './chatbox.css'
import ChatBoard from "../ChatBoard/ChatBoard";
import Input from "../Input/Input";
import { useChatAuth } from "../../Context/ChatContext";



const Chatbox = (props) => {

  const { data } = useChatAuth();

  return (
    <div className="chatbox">
      <div className="titlebar">
        <span className="username">{data.user?.displayName}</span>
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </div>
      <ChatBoard />
      <Input />
    </div>
  )
};

export default Chatbox;
