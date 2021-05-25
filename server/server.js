const {
    updateBio,
    insertMessage,
    selectMessages,
    getUserInfo,
} = require("./db");

const express = require("express");
const app = express();
module.exports.app = app;

const cookieSession = require("cookie-session");
const cookieSecret = require("../secrets.json")["cookie-secret"];

const csurf = require("csurf");
const compression = require("compression");
const path = require("path");

// Socket setup
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

// app.use(
//     cookieSession({
//         secret: cookieSecret,
//         maxAge: 1000 * 60 * 60 * 24 * 14,
//     })
// );

// Cookie session
const cookieSessionMiddleware = cookieSession({
    secret: cookieSecret,
    maxAge: 1000 * 60 * 60 * 24 * 14,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());
app.use((req, res, next) => {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use((req, res, next) => {
    res.setHeader("x-frame-options", "deny");
    next();
});

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(express.json());

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

// Routes

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

// Registration, login and logout
require("./routes/auth");

// Password reset
require("./routes/password-reset");

// User information
require("./routes/user-info");

// Image upload
require("./routes/uploader");

// Bio update
app.post("/update-bio", async (req, res) => {
    const { bio } = req.body;
    const { userId } = req.session;
    try {
        const result = await updateBio(bio, userId);
        res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error in /update-bio route",
        });
    }
});

// Find users
require("./routes/users-search");

// Connection status
require("./routes/connection-status");

// Connections and requests
require("./routes/connections-requests");

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

io.on("connection", async function (socket) {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    console.log(`socket with the id ${socket.id} is now connected`);

    const userId = socket.request.session.userId;

    const { rows: allMessages } = await selectMessages();
    io.emit("allMessages", allMessages.reverse());

    socket.on("newMessage", async (messageObj) => {
        const { message } = messageObj;
        try {
            const { rows: newMessage } = await insertMessage(message, userId);
            const { rows: userInfo } = await getUserInfo(userId);
            const newMsgAndUserUnfo = {
                first_name: userInfo[0].first_name,
                last_name: userInfo[0].last_name,
                img_url: userInfo[0].img_url,
                message: newMessage[0].message,
                created_at: newMessage[0].created_at,
            };
            io.emit("newMessage", newMsgAndUserUnfo);
        } catch (err) {
            console.log("Error in socket: ", err);
        }
    });
});
