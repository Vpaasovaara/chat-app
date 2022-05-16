import React, { useContext } from "react";
import { AppContext } from "..";
import { AppContextType } from "../../types";
import { useField } from "../../hooks/useField";


const JoinChat = () => {
    const { setSelection, setJoinChat, socket } = useContext(AppContext) as AppContextType;
	const { reset: usernameReset, ...username } = useField('text', 'your name');
	const { reset: roomNameReset, ...roomName } = useField('text', 'Enter room name...');

	// Emit new user to server
	const submitform = (e: React.SyntheticEvent) => {
		e.preventDefault();

		try {
			const body = { roomName: roomName.value, username: username.value };
			console.log('body before sending to be', body)
			socket.emit('joinRoom', body);
			
		} catch (exception) {
			console.log(exception);
		}
	}

    return (
	   <main className="join-main">
			<form onSubmit={(e) => submitform(e)}>
				<div className="form-control">
					<label htmlFor="username">Enter room name you wish to join</label>
					<input {...roomName} required/>
					<label htmlFor="username">Enter your name</label>
					<input {...username} required/>
				</div>
				<button type="submit" className="btn">Join Room</button>
				<button onClick={() => {
                    setSelection(true);
                    setJoinChat(false);
                }} type="button" className="btn">Back</button>
			</form>
		</main>
    )
}

export default JoinChat;