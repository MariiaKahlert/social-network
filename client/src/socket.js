import io from "socket.io-client";
import { allMessages, newMessage } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("allMessages", (msgs) => store.dispatch(allMessages(msgs)));

        socket.on("newMessage", (msg) => store.dispatch(newMessage(msg)));
    }
};
