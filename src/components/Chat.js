import React, { useState, useEffect} from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../StateProvider';

import './Chat.css';
import db from '../firebase';
import firebase from 'firebase';



function Chat() {

    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}] = useStateValue();
    //hook
    const { roomId } = useParams();

    //change name on the chat
    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);
            });

            db.collection('rooms')
            .doc(roomId)
            .collection("messages")
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => { setMessages(snapshot.docs.map(doc => doc.data()));
            });
        }
    },[roomId]);
    
    //Randomize Avator
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    //Input for database
    const sendMessage = (e) => {
        e.preventDefault();
         db.collection('rooms').doc(roomId).collection('messages').add({
            "message": input,
            "name": user.displayName,
            "timestamp": firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput("");
    };

    return (
        <div className="chat">
        <div className="chat_header">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/> 
    
            <div className='chat_headerInfo'>
            <h3 className="chat_room_name">{roomName}</h3>
            <p className="chat_room_last_seen">
             Last seen {" "}
             {new Date(
                        messages[messages.length - 1]?.timestamp?.toDate()
                        ).toUTCString()}
             </p>
            
            </div>

            <div className='chat_headerRight'>
                <IconButton>
                        <SearchOutlined/>
                </IconButton>
                 <IconButton>
                        <AttachFile/>
                </IconButton>
                <IconButton>
                        <MoreVert/>
                </IconButton>
            </div>
           

        </div>

         <div className="chat_body">
                {messages.map(message => (
                    <p className={`chat_message ${message.name === user.displayName && "chat_receiver"}`}>
                        <span className="chat_name">
                            {message.name}
                        </span>
                            {message.message}
                            <span className="chat_timestamp">{new Date(message.timestamp?.toDate()).toUTCString(+ 3)}</span>
                    </p>
                ))}
            
         
        </div>

        <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message" type="text" />
                    <button onClick={sendMessage} type="submit">
                        Send a message
                    </button>
                </form>
                <MicIcon />
        </div>
            
        </div>
    )
}

export default Chat

