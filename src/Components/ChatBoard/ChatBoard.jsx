import React, {useState, useEffect }from "react"
import './chatboard.css'
import Chat from "../Chat/Chat";
import { useChatAuth } from "../../Context/ChatContext";

import {doc, onSnapshot} from "firebase/firestore";
import { db } from "../../Firebase/firebase";


const ChatBoard = (props) => {

  const [messages, setMessages] = useState([]);
  const { data } = useChatAuth();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="chatboard">
      {messages.map((m) => (
        <Chat message={m} key={m.id} />
      ))}
    </div>
  )
};

export default ChatBoard;
