import axios from "./axios";
export async function getConnectionsAndRequests() {
    const { data } = await axios.get("/connections-requests");
    console.log(data);
    return {
        type: "GET_CONNECTIONS_AND_REQUESTS",
        users: data,
    };
}
