import React, { useState, useEffect} from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { useParams } from 'react-router-dom';

import './Chat.css';
import db from '../firebase';



function Chat() {

    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const [roomName, setRoomName] = useState("");
    //hook
    const { roomId } = useParams();

    //change name on the chat
    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => setRoomName
                (snapshot.data().name)
            );
        }
    },[roomId]);
    

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>> ", input);

        setInput("");
    }

    return (
        <div className="chat">
        <div className="chat_header">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/> 
    
            <div className='chat_headerInfo'>
            <h3>{roomName}</h3>
            <p>Last seen at ... </p>
             {/*   <h3 className='chat_room_name'>
                   {roomName}  
                </h3>
             */}
                { /*
                <p className='chat_room_last_seen'>
                    last seen {" "}
                    {new Data(
                        messages[messages.length - 1]?.timestamp?.toDate()
                    ).toUTCString}

                </p> */
                }
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
            <p className="chat_message chat_receiver">
            <span className="chat_name">
                Kelvin Kahihu
            </span>
             Hey Guys

             <span className="chat_timestamp">
                 4:00pm
             </span>
            </p>
         
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

