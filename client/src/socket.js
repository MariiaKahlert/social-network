import io from "socket.io-client";
import {
    allMessages,
    moreMessages,
    newMessage,
    handleConnectionRequests,
    newProfileImage,
} from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("allMessages", (msgs) => store.dispatch(allMessages(msgs)));

        socket.on("moreMessages", (msgs) => store.dispatch(moreMessages(msgs)));

        socket.on("newMessage", (msg) => store.dispatch(newMessage(msg)));

        socket.on("handleConnectionRequests", (users) =>
            store.dispatch(handleConnectionRequests(users))
        );

        socket.on("newProfileImage", (user) =>
            store.dispatch(newProfileImage(user))
        );
    }
};
