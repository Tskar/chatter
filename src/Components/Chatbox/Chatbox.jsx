import React, { useEffect } from "react"
import './chatbox.css'
import ChatBoard from "../ChatBoard/ChatBoard";
import Input from "../Input/Input";
import { useChatAuth } from "../../Context/ChatContext";


const Chatbox = ({select, setSelect}) => {

  const { data } = useChatAuth();

  useEffect(() => {
    if (data.user?.displayName === undefined) {
      setSelect(false);  
     } else {
      setSelect(true); 
     }
  }, [data, setSelect]);


  return (
    <div className={`chatbox ${select ? "" : "no-chatbox"}`}>
      {!select && <span className="emptySpan">Select a conversation.</span>}
      {select && (

        <>
          <div className="titlebar">
          <i class="fa-solid fa-arrow-left back-button" onClick={()=> setSelect(false)}></i>
            <span className="username">{data.user?.displayName}</span>
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </div>
          <ChatBoard />
          <Input />
        </>
      )}
    </div>
  );
};

export default Chatbox;
