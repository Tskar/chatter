import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useAuth } from "../../Context/AuthContext";
import { useChatAuth } from "../../Context/ChatContext";
import { db } from "../../Firebase/firebase";
import './input.css';

const Input = (props) => {

  const { currentUser } = useAuth();
  const { data } = useChatAuth();

  const [text, setText] = useState("");

  const handleSend = async () => {

    // Reference Firestore document with the user's UID
    try{

      const chatRef = doc(db, "chats", data.chatId); //Firestore instance
      const chatData = arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      });
      
      await updateDoc(chatRef, {messages: chatData});
      console.log("Successfully uploaded chat");
   } catch (error) {
     console.error("Error uploaded chat:", error);
   }

   try{

    const userInboxRef = doc(db, "useInbox", currentUser.uid); //Firestore instance
    const userLastMsgData = {[data.chatId + ".lastMessage"]: {text,},[data.chatId + ".date"]: serverTimestamp()};
    await updateDoc(userInboxRef, userLastMsgData);

    console.log("Successfully updated last msg from user.");
    } catch (error) {
    console.error("Error updating msg:", error);
    }

    try{

      const userInboxRef = doc(db, "useInbox", data.user.uid); //Firestore instance
      const userLastMsgData = {[data.chatId + ".lastMessage"]: {text,},[data.chatId + ".date"]: serverTimestamp()};
      await updateDoc(userInboxRef, userLastMsgData);
  
      console.log("Successfully updated last msg from other user.");
    } catch (error) {
      console.error("Error updating msg:", error);
    }
    setText("");
  }

  return (
    <div className="input">
      <input className="input-field"type="text" placeholder="Type your message.." onChange={(e) => setText(e.target.value)} value={text}></input>
      <button className="send" onClick={handleSend}>Send</button>
    </div>
  )
};

export default Input;
