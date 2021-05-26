const { io } = require("./server");
const {
    insertMessage,
    selectMessages,
    getUserInfo,
    selectMoreMessages,
    selectConnectionsAndRequests,
} = require("./db");
const onlineUsers = {};

io.on("connection", async function (socket) {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.userId;
    onlineUsers[userId] = socket.id;

    console.log(`User ${userId} just connected with socket ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(
            `User ${userId} just disconnected with socket ${socket.id}`
        );
        delete onlineUsers[socket.id];
    });

    const { rows: allMessages } = await selectMessages();
    socket.emit("allMessages", allMessages.reverse());

    socket.on("newMessage", async (messageObj) => {
        const { message } = messageObj;
        try {
            const { rows: newMessage } = await insertMessage(message, userId);
            const { rows: userInfo } = await getUserInfo(userId);
            const newMsgAndUserUnfo = {
                sender_id: userInfo[0].id,
                first_name: userInfo[0].first_name,
                last_name: userInfo[0].last_name,
                img_url: userInfo[0].img_url,
                message: newMessage[0].message,
                created_at: newMessage[0].created_at,
            };
            io.emit("newMessage", newMsgAndUserUnfo);
        } catch (err) {
            console.log("Error in newMessage socket event: ", err);
        }
    });

    socket.on("moreMessages", async (messageObj) => {
        const { oldestMessageId } = messageObj;
        try {
            const { rows: moreMessages } = await selectMoreMessages(
                oldestMessageId
            );
            socket.emit("moreMessages", moreMessages.reverse());
        } catch (err) {
            console.log("Error in moreMessages socket event: ", err);
        }
    });

    socket.on("handleConnectionRequests", async ({ otherUserId }) => {
        try {
            const { rows: users } = await selectConnectionsAndRequests(
                otherUserId
            );
            const otherUserSocket = io.sockets.sockets.get(
                onlineUsers[otherUserId]
            );
            if (otherUserSocket) {
                otherUserSocket.emit("handleConnectionRequests", users);
            }
        } catch (err) {
            console.log(
                "Error in handleConnectionRequests socket event: ",
                err
            );
        }
    });

    socket.on("newProfileImage", async ({ loggedInUserId }) => {
        try {
            const { rows: userInfo } = await getUserInfo(loggedInUserId);
            io.emit("newProfileImage", {
                userId: userInfo[0].id,
                imgUrl: userInfo[0].img_url,
            });
        } catch (err) {
            console.log("Error in newProfileImage socket event: ", err);
        }
    });
});
