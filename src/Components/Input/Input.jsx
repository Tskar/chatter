import React from "react"
import './input.css'

const Input = (props) => {
  return (
    <div className="input">
      <input className="input-field"type="text" placeholder="Type your message.."></input>
      <button className="send">Send</button>
    </div>
  )
};

export default Input;
