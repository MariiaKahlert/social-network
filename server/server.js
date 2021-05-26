const {
    deleteUser,
    deleteUserMessages,
    deleteUserConnections,
    deleteUserCodes,
    getUserInfo,
} = require("./db");
const { s3Url } = require("../config.json");
const { deleteImage } = require("./utils/s3");
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
module.exports.io = io;

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
require("./routes/bio-update");

// Find users
require("./routes/users-search");

// Connection status
require("./routes/connection-status");

// Connections and requests
require("./routes/connections-requests");

// Forum
require("./routes/forum");

// Delete account
app.post("/delete-account", async (req, res) => {
    const { userId } = req.session;
    try {
        const previousImgUrl = (
            await getUserInfo(userId)
        ).rows[0].img_url?.slice(s3Url.length);
        if (previousImgUrl) {
            await deleteImage(previousImgUrl);
        }
        await deleteUserMessages(userId);
        await deleteUserConnections(userId);
        await deleteUserCodes(userId);
        await deleteUser(userId);
        req.session = null;
        res.status(200).json({
            success: "Account deleted successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error in /delete-account route",
        });
    }
});

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
