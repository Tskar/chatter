import React from "react"
import './inbox.css'
import tempImg from '../../Images/App-logo.png'

const Inbox = (props) => {
  return (
    <div className="inbox">
      <div className="userInbox">
        <img src={tempImg} alt=""></img>
        <div className="inbox-item-detail">
          <span>User 1</span>
          <p>This is the message..</p>
        </div>
        <div className="inbox-item-date">
          <p>Fri Oct 14</p>
        </div>
      </div>

      <div className="userInbox">
        <img src={tempImg} alt=""></img>
        <div className="inbox-item-detail">
          <span>User 1</span>
          <p>This is the message..</p>
        </div>
        <div className="inbox-item-date">
          <p>Fri Oct 14</p>
        </div>
      </div>

    </div>
  )
};

export default Inbox;
