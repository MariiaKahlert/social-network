const { io } = require("../server");
const {
    insertMessage,
    selectMessages,
    getUserInfo,
    selectMoreMessages,
} = require("../db");

io.on("connection", async function (socket) {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    console.log(`socket with the id ${socket.id} is now connected`);

    const userId = socket.request.session.userId;

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
