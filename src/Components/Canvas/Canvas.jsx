import React, { useState } from "react"
import './canvas.css'
import Sidebar from "../Sidebar/Sidebar";
import Chatbox from "../Chatbox/Chatbox";

const Canvas = (props) => {

  const [select, setSelect] = useState(false);
  
  return (
    <div className="canvas">
      <Sidebar select = {select} />
      <Chatbox select = {select} setSelect={setSelect}/>
    </div>
  )
};

export default Canvas;
