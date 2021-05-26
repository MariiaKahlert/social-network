const { io } = require("../server");
const { app } = require("../server");
const { selectConnectionsAndRequests } = require("../db");
const onlineUsers = {};

app.get("/connections-requests", async (req, res) => {
    const { userId } = req.session;
    try {
        const { rows } = await selectConnectionsAndRequests(userId);
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error in /connections-requests route",
        });
    }
});

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
});
