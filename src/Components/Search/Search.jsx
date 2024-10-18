import React, { useState } from "react";
import './search.css';
import { useAuth } from "../../Context/AuthContext";
import { db } from '../../Firebase/firebase';
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";


const Search = (props) => {  

  const[ user, setUser ] = useState(null);
  const [ username, setUsername ] = useState("");
  const [ error, setError ] = useState(false);

  const { currentUser } = useAuth();

  const handleSearch = async() => {
    const qry = query(collection(db, "users"), where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(qry);
      
      if (querySnapshot.size === 0) {
        setError(true);
        setUser(null);
      } else {
        setError(false);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
          console.log("Doc.data: ", doc.data());
        });
      }
    } catch (error) {console.log(error); setError(true)};
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  const handleResult = async () => {

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {

        //Chat Instance in Firebase
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //update owners inbox
        await updateDoc(doc(db, "userInbox", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        //update chat participant's inbox
        await updateDoc(doc(db, "userInbox", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
    setUser(null);
    setUsername("")
  };

  return (
    <div className="search">
      <div className="search-box">
        <input type="text" 
          className="search-user-field" 
          placeholder="Look up friends.." 
          onKeyDown={handleKey} 
          onChange={(e) => setUsername(e.target.value)}
          value={username}></input>
      </div>
      <div className="search-result">
        {error && <span>User not found</span>}
        {user && (
          <div className="search-result-entry" onClick={handleResult}>
            <img src={user.photoURL} alt=""></img>
            <span>{user.displayName}</span>
          </div>
        )}
      </div>
    </div>
  )
};

export default Search;