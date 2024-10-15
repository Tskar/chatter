import React from "react"
import './chatbox.css'
import ChatBoard from "../ChatBoard/ChatBoard";
import Input from "../Input/Input";

const Chatbox = (props) => {
  return (
    <div className="chatbox">
      <div className="titlebar">
        <span className="username">User 1</span>
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </div>
      <ChatBoard />
      <Input />
    </div>
  )
};

export default Chatbox;
