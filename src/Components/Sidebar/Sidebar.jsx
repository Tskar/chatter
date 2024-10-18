import React from "react"
import './sidebar.css'
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import Inbox from "../Inbox/Inbox";

const Sidebar = ({ select }) => {
  return (
    <div className={` sidebar ${select ? "no-sidebar" : ""}`}>
      {console.log('sidebar ', select)}
      <Navbar />
      <Search />
      <Inbox />
    </div>
  )
};

export default Sidebar;
