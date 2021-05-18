const {
    updateBio,
    getConnectionStatus,
    insertConnection,
    updateConnectionStatus,
} = require("./db");

const express = require("express");
const app = express();
module.exports.app = app;

const cookieSession = require("cookie-session");
const cookieSecret = require("../secrets.json")["cookie-secret"];
const csurf = require("csurf");
const compression = require("compression");
const path = require("path");

app.use(
    cookieSession({
        secret: cookieSecret,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

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

// Connection status check
app.get("/connection-status", async (req, res) => {
    const { userId: senderId } = req.session;
    const { q: recipientId } = req.query;
    try {
        const result = await getConnectionStatus(senderId, recipientId);
        if (result.rows.length === 0) {
            res.status(200).json({
                btnText: "Connect",
            });
            return;
        }
        if (result.rows[0].accepted) {
            res.status(200).json({
                btnText: "Disconnect",
            });
            return;
        }

        if (!result.rows[0].accepted) {
            if (result.rows[0].recipient_id === senderId) {
                res.status(200).json({
                    btnText: "Accept",
                });
            } else {
                res.status(200).json({
                    btnText: "Cancel",
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error in GET /connection-status route",
        });
    }
});

app.post("/connection-status", async (req, res) => {
    console.log(req.body);
    const { userId: loggedInUsed } = req.session;
    const { btnText, otherUser } = req.body;
    try {
        if (btnText === "Connect") {
            const result = await insertConnection(loggedInUsed, otherUser);
            if (!result.rows[0].accepted) {
                if (result.rows[0].recipient_id === loggedInUsed) {
                    res.status(200).json({
                        btnText: "Accept",
                    });
                } else {
                    res.status(200).json({
                        btnText: "Cancel",
                    });
                }
            }
            return;
        }

        if (btnText === "Accept") {
            const result = await updateConnectionStatus(
                loggedInUsed,
                otherUser
            );
            console.log(result);
            if (result.rows[0].accepted) {
                res.status(200).json({
                    btnText: "Disconnect",
                });
                return;
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error in POST /connection-status route",
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

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
