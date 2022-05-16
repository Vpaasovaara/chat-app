import type { NextPage } from 'next'
import React, { useState, createContext, useEffect } from 'react'
import Selection from './components/Selection';
import JoinChat from './components/JoinChat';
import CreateRoom from './components/CreateRoom';
import { io, Socket } from 'socket.io-client';
import ChatRoom from './components/ChatRoom';
import { ServerToClientEvents, ClientToServerEvents, AppContextType, chatMessagePayloadFromServer } from '../types';

// Create context for the app
export const AppContext = createContext<AppContextType>({} as AppContextType);

// Initialize client socket instance
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:3003/');

const Home: NextPage = () => {

  // App states
  const [ createRoom, setCreateRoom ] = useState<boolean>(false);
  const [ joinChat, setJoinChat ] = useState<boolean>(false);
  const [ selection, setSelection ] = useState<boolean>(true);
  const [ chatRoom, setChatRoom ] = useState<boolean>(false);
  const [ username, setUsername ] = useState<string>('');
	const [ roomname, setRoomname ] = useState<string>('');
  const [ roomList, setRoomList ] = useState<string[]>([]);
  const [ userList, setUserList ] = useState<string[]>([]);
  const [ messages, setMessages ] = useState<chatMessagePayloadFromServer>([] as chatMessagePayloadFromServer);
  

  // Listen for socket events
  useEffect(() => {

    socket.on('message', message => {
      console.log(message);
    })

		socket.on('createRoom', user => {
			roomCreator(user.username, user.roomName, user.roomsList);
		});

    socket.on('createRoomError', roomname => {
      alert(`room ${roomname} already exists!`);
    })

    socket.on('updateRoomList', rooms => {
      setRoomList(rooms);
    })

    socket.on('joinRoom', body => {
      roomJoiner(body.username, body.roomName)
    })

    socket.on('joinRoomError', room => {
      alert(`room ${room} doesn't exist`);
    })

    socket.on('updateUserList', users => {
      setUserList(users);
    })

    socket.on('chatMessage', messagesFromServer => {
      console.log('messages from server', messagesFromServer);
      setMessages(messagesFromServer);
  })

    return () => {
      socket.off('message');
      socket.off('createRoom');
      socket.off('createRoomError');
      socket.off('updateRoomList');
      socket.off('joinRoom');
      socket.off('joinRoomError');
      socket.off('updateUserList');
      socket.off('chatMessage')
    }
    
	}, [socket])

  // Create room function
  const roomCreator = (username: string, roomName: string, roomsList: string[]) => {
    console.log(`message from server socket: room ${roomName} was created by ${username}`);
    console.log('room list from server: ', roomsList);
    setUsername(username);
    setRoomname(roomName);
    setChatRoom(true);
    setCreateRoom(false);
  }

  // Join room function
  const roomJoiner = (username: string, roomName: string) => {
    setUsername(username);
    setRoomname(roomName);
    setChatRoom(true);
    setJoinChat(false);
  }
  

  return (
    <div className="join-container">
      <AppContext.Provider value={{ 
        setCreateRoom,
        setJoinChat,
        setSelection,
        setChatRoom,
        username,
        setUsername,
        roomname,
        setRoomname,
        roomList,
        socket,
        userList,
        messages }}>
			<header className="join-header">
				<h1><i className="fas fa-smile"></i> Chat Room</h1>
			</header>
			{selection && <Selection />}
      {joinChat && <JoinChat />}
      {createRoom && <CreateRoom />}
      {chatRoom && <ChatRoom />}
      </AppContext.Provider>
		</div>
  )
}

export default Home


