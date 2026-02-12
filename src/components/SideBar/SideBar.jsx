import "./SideBar.css"
import React from 'react'

function SideBar() {
return (
    <div className="side-bar">
        <h3 className="title">chat gpt</h3>
        <div className="chats">
            <h1>chats:</h1>
            <h3 className="chat">Lorem ipsum dolor sit.</h3>
            <h3 className="chat">Lorem ipsum dolor sit.</h3>
            <h3 className="chat">Lorem ipsum dolor sit.</h3>
            <a href="#">new chat</a>
        </div>
    </div>
)
}

export default SideBar
