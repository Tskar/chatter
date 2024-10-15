import React, { useState } from "react"
import './search.css'
import tempImg from '../../Images/App-logo.png'

const Search = (props) => {
  const[ found, setFound ] = useState(true);
  return (
    <div className="search">
      <div className="search-box">
        <input type="text" className="search-user-field" placeholder="Look up friends.."></input>
      </div>
      <div className="search-result">
        {!found && <span>User not found</span>}
        {!found && (
          <div className="search-result-entry">
            <img src={tempImg} alt=""></img>
            <span>User 1</span>
          </div>
        )}
      </div>
    </div>
  )
};

export default Search;