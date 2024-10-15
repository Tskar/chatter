import React, { useState, useEffect } from "react"
import './inbox.css'
import { doc, onSnapshot} from "firebase/firestore";
import { useAuth } from "../../Context/AuthContext";
import { useChatAuth } from "../../Context/ChatContext";
import {db} from '../../Firebase/firebase';

const Inbox = (props) => {

  const { currentUser } = useAuth();
  const [chats, setChats] = useState([]);

  const { dispatch } = useChatAuth();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userInbox", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleResult = (u) => {
    dispatch({type: "CHANGE_USER", payload: u});
  };

  return (
    <div className="inbox">

      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) =>(

        <div className="userInbox" key={chat[0]} onClick={()=> handleResult(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} alt=""></img>
          <div className="inbox-item-detail">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
          <div className="inbox-item-date">
            <p>{chat[1].date.toDate().toLocaleTimeString('en-US')}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Inbox;
