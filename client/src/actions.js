import axios from "./axios";
export async function getConnectionsAndRequests() {
    const { data } = await axios.get("/connections-requests");
    return {
        type: "GET_CONNECTIONS_AND_REQUESTS",
    };
}
