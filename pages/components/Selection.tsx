import React, { useContext } from "react";
import { AppContext } from "..";
import { AppContextType } from "../../types";

const Selection = () => {
    const { setSelection, setCreateRoom, setJoinChat } = useContext(AppContext) as AppContextType;

    return (
        <main className="join-main">
            <button onClick={() => {
                setSelection(false);
                setCreateRoom(true);
            }} type="submit" className="btn">Create Room</button>
		    <button onClick={() => {
                setSelection(false);
                setJoinChat(true);
            }} type="submit" className="btn">Join Chat</button>
		</main>
    )
}

export default Selection;