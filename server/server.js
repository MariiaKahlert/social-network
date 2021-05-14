const { getUserInfo, updateBio } = require("./db");

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

// Registration and login
require("./routes/auth");

// Logout
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome#/login");
});

// Password reset
require("./routes/password-reset");

// User information
app.get("/user", (req, res) => {
    const { userId } = req.session;
    getUserInfo(userId)
        .then((result) => res.json(result.rows[0]))
        .catch((err) => console.log(err));
});

app.get("/other-user/:id", (req, res) => {
    const { id } = req.params;
    if (parseInt(id) === req.session.userId) {
        res.status(400).json({
            error: "The users is trying to access the url with their own id as param",
        });
        return;
    }
    getUserInfo(id)
        .then((result) => {
            if (result.rows.length === 0) {
                res.status(400).json({
                    error: "The user does not exist",
                });
                return;
            }
            res.json(result.rows[0]);
        })
        .catch((err) => console.log(err));
});

// Image upload
require("./routes/uploader");

// Bio update
app.post("/update-bio", (req, res) => {
    const { bio } = req.body;
    const { userId } = req.session;
    updateBio(bio, userId)
        .then((result) => {
            res.json(result.rows[0]);
        })
        .catch((err) => console.log(err));
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
