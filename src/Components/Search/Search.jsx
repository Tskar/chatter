import React, { useState } from "react";
import './search.css';
import { useAuth } from "../../Context/AuthContext";
import { db } from '../../Firebase/firebase';
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";


const Search = (props) => {  

  const[ user, setUser ] = useState([]);
  const [ username, setUsername ] = useState("");
  const [ error, setError ] = useState(false);

  const { currentUser } = useAuth();

  const handleSearch = async() => {

    if(username === "") {setUser([]); setError(false); return;}

    const qry = query(collection(db, "users"), where("lowercaseUName", ">=", username.toLowerCase()),
    where("lowercaseUName", "<=", username.toLowerCase() + '\uf8ff'));

    try {
      const querySnapshot = await getDocs(qry);
      
      if (querySnapshot.size === 0) {
        setError(true);
        setUser([]);
      } else {
        setError(false);
        const usersArray = [];

        querySnapshot.forEach((doc) => {
          usersArray.push(doc.data());
        });
        setUser(usersArray);
        console.log("users: ", usersArray);
      }
    } catch (error) {console.log(error); setError(true)};
  };

  const handleKey = (e) => {
    e.keyCode === 13 && handleSearch() ;
  }

  const handleResult = async (u) => {

    const combinedId =
      currentUser.uid > u.uid
        ? currentUser.uid + u.uid
        : u.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {

        //Chat Instance in Firebase
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //update owners inbox
        await updateDoc(doc(db, "userInbox", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: u.uid,
            displayName: u.displayName,
            photoURL: u.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        //update chat participant's inbox
        await updateDoc(doc(db, "userInbox", u.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
    setUser([]);
    setUsername("")
  };

  return (
    <div className="search">
      <div className="search-box">
        <input type="text" 
          className="search-user-field" 
          placeholder="Look up friends.."
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          enterKeyHint="enter"          
          value={username}></input>
      </div>
      <div className="search-result">
        {error && <span>User not found</span>}

        {user?.map((u, index) =>(
          <div key={index} className="search-result-entry" onClick={() => handleResult(u)}>
            <img src={u.photoURL} alt=""></img>
            <span>{u.displayName}</span>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Search;