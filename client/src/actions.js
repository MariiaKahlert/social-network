import axios from "./axios";

export async function getConnectionsAndRequests() {
    try {
        const { data } = await axios.get("/connections-requests");
        return {
            type: "GET_CONNECTIONS_AND_REQUESTS",
            users: data,
        };
    } catch (err) {
        console.log("Error in getConnectionsAndRequests action: ", err);
    }
}

export async function otherUserConnections(id) {
    try {
        const { data } = await axios.get(`/other-connections?q=${id}`);
        return {
            type: "OTHER_CONNECTIONS",
            otherUsers: data,
        };
    } catch (err) {
        console.log("Error in otherUserConnections action: ", err);
    }
}

export async function acceptConnection(userId) {
    const btnText = "Accept";
    try {
        await axios.post("/connection-status", {
            otherUser: userId,
            btnText,
        });
        return {
            type: "ACCEPT_CONNECTION",
            userId,
        };
    } catch (err) {
        console.log("Error in accept action: ", err);
    }
}
export async function disconnect(userId) {
    const btnText = "Disconnect";
    try {
        await axios.post("/connection-status", {
            otherUser: userId,
            btnText,
        });
        return {
            type: "DISCONNECT",
            userId,
        };
    } catch (err) {
        console.log("Error in disconnect action: ", err);
    }
}

export async function allMessages(msgs) {
    return {
        type: "ALL_MESSAGES",
        msgs,
    };
}

export async function moreMessages(msgs) {
    return {
        type: "MORE_MESSAGES",
        msgs,
    };
}

export async function newMessage(msg) {
    return {
        type: "NEW_MESSAGE",
        msg,
    };
}
export async function resetNewMessages() {
    return {
        type: "RESET_NEW_MESSAGES",
    };
}

export async function handleConnectionRequests(users) {
    return {
        type: "HANDLE_CONNECTION_REQUESTS",
        users: users,
    };
}

export async function newProfileImage(user) {
    return {
        type: "NEW_PROFILE_IMAGE",
        user,
    };
}
