import io from "socket.io-client";
import { forumMessages, forumMessage } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("forumMessages", (msgs) =>
            store.dispatch(forumMessages(msgs))
        );

        socket.on("forumMessage", (msg) => store.dispatch(forumMessage(msg)));
    }
};
