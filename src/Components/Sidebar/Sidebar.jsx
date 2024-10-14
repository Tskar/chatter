import React from "react"
import './sidebar.css'
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import Inbox from "../Inbox/Inbox";

const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Inbox />
    </div>
  )
};

export default Sidebar;
