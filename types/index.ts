import { Socket } from "socket.io-client";

export interface ServerToClientEvents {
  message: (message: string) => void;
  chatMessage: (payload: chatMessagePayloadFromServer) => void;
  createRoom: (body: CreateRoomFromServer) => void;
  createRoomError: (roomName: string) => void;
  joinRoom: (body: JoinRoomFromServer) => void;
  joinRoomError: (roomName: string) => void;
  updateRoomList: (roomList: Array<string>) => void;
  updateUserList: (userList: Array<string>) => void;
}
  
export interface ClientToServerEvents {
  hello: () => void;
  message: (arg: string) => void;
  chatMessage: (payload: chatMessageType) => void;
  createRoom: (body: createRoomPayload) => void;
  joinRoom: (body: createRoomPayload) => void;
}

export type AppContextType = {
  setCreateRoom: (arg: boolean) => void;
  setJoinChat: (arg: boolean) => void;
  setSelection: (arg: boolean) => void;
  setChatRoom: (arg: boolean) => void;
  username: string;
  setUsername: (arg: string) => void;
  roomname: string;
  setRoomname: (arg: string) => void;
  roomList: Array<string>;
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  userList: Array<string>;
  messages: Array<chatMessageType>;
}

interface createRoomPayload {
  username: string;
  roomName: string;
}

interface CreateRoomFromServer extends createRoomPayload {
  roomsList: Array<string>;
}

interface JoinRoomFromServer extends createRoomPayload {
  userList: Array<string>;
}

export interface chatMessageType {
  message: string;
  username: string;
  roomname: string;
  date: string;
}

export type chatMessagePayloadFromServer = Array<chatMessageType>