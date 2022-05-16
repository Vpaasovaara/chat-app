import { AppContext } from "..";
import React, { useContext} from "react";
import { useField } from "../../hooks/useField";
import { AppContextType } from "../../types";

const CreateRoom = () => {
    const { setSelection, setCreateRoom, socket } = useContext(AppContext) as AppContextType;
	const { reset: usernameReset, ...username } = useField('text', 'your name');
	const { reset: roomNameReset, ...roomName } = useField('text', 'Enter room name...');

	// Emit new room to server
	const submitform = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		try {
			const body = { roomName: roomName.value, username: username.value };
			socket.emit('createRoom', body);
		} catch (exception) {
			console.log(exception);
		}
	}

    return (
	   <main className="join-main">
			<form onSubmit={(e) => submitform(e)}>
				<div className="form-control">
					<label htmlFor="username">Create room name</label>
					<input {...roomName} required/>
					<label htmlFor="username">Enter your name</label>
					<input {...username} required/>
				</div>
				<button type="submit" className="btn">Create Room</button>
				<button onClick={() => {
                    setSelection(true);
                    setCreateRoom(false);
                    }
                } type="button" className="btn">Back</button>
			</form>
		</main>
    )
}

export default CreateRoom;