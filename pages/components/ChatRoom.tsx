import React, { useContext } from "react";
import { AppContext } from "..";
import { useField } from "../../hooks/useField";
import { AppContextType, chatMessageType } from "../../types";

const ChatRoom = () => {
    const { roomname, username, socket, userList, messages } = useContext(AppContext) as AppContextType;
    const { reset: msgReset, ...msg } = useField('', '');

    // When form is submitted, emit message to server
    const submitMessage = (e: React.SyntheticEvent) => {
        e.preventDefault();
        socket.emit('chatMessage', { message: msg.value, username: username, roomname: roomname, date: new Date().toString() });
        msgReset();
    }

    // Function to calculate date for chat messages
    const calculateTime = (messageDate: string) => {
        var seconds = 1000;
        var minutes = 60 * seconds;
        var hours = 60 * minutes;
        var days = 24 * hours;
    
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
        var time = new Date(messageDate).getTime();
        var referenceTime = new Date().getTime();
        var timeDifference = referenceTime - time;
    
        if (timeDifference < minutes) {
            return `${Math.floor(timeDifference / seconds)} seconds ago`;
        } else if (timeDifference > minutes && timeDifference < hours) {
            return `${Math.floor(timeDifference / minutes)} minutes ago`;
        } else if (timeDifference > hours && timeDifference < days) {
            return `${Math.floor(timeDifference / hours)} hours ago`;
        } else if (timeDifference > days && timeDifference < days * 7) {
            return `${Math.floor(timeDifference / days)} days ago`;
        } else if (timeDifference > days * 7) {
            return `${months[new Date(time).getMonth()]}, ${new Date(time).getDate()}`
        }
    
    }

    return (
	   <main className="join-main">
			<div className="flex flex-row text-black h-80">
                <div className="p-5 w-1/4">
                    <h3>Users in the chat room:</h3>
                    <ul className="list-disc ml-4">
                        {userList && userList.map((user: string, i: number) => {
                            return (
                                <li key={i}><b>{user}</b></li>
                            )
                        })}
                    </ul>
                </div>
                <div className="w-3/4 bg-white rounded overflow-y-auto">
                    <ul className="flex flex-col items-center justify-center">
                        {messages && messages.map((message: chatMessageType, i: number) => {
                            return (
                                <li key={i} className="p-2 w-[90%] rounded bg-[#667aff] text-black my-2 flex flex-col">
                                    <p className="ml-auto"><b>{message.username}</b></p>
                                    <p className="ml-auto -mt-6">{message.message}</p>
                                    <p className="-my-6 text-sm font-extrabold"><i>{calculateTime(message.date)}</i></p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <form onSubmit={submitMessage}>
                <div className="flex flex-row-reverse">
                    <input className="w-3/4 h-10 bg-white mt-4 rounded text-black ml-6 p-1 text-right" {...msg}></input>
                    <button className="w-1/5 text-white bg-black mt-4 p-2 rounded justify-center text-center" type="submit">Send</button>
                </div>
            </form>
		</main>
    )
}

export default ChatRoom;