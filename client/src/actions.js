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
