import React, {useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';


import './SidebarChat.css';
import db from '../firebase';


function SidebarChat({ id, addNewChat, name }) {



    const [seed, setSeed] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const createChat = () => {
        const roomName = prompt("Please Enter Name for chat room");

        if(roomName){
            // do something
             db.collection("rooms").add({
                name: roomName,
            });
        }
    };
    


    return !addNewChat ? (
        //change id for individual chat
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
           <Avatar  src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
           <div className="sidebarChat_info">
               <h2>{name}</h2>
               <p>Last message...</p>
           </div>
        </div>
        </Link>
        
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h3 className="add-new-chat-title">Add New Chat</h3>
        </div>
    )
}

export default SidebarChat
