import React from "react"
import './canvas.css'
import Sidebar from "../Sidebar/Sidebar";
import Chatbox from "../Chatbox/Chatbox";

const Canvas = (props) => {
  return (
    <div className="canvas">
      <Sidebar />
      <Chatbox />
    </div>
  )
};

export default Canvas;
