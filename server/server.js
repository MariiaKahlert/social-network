const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const cookieSecret = require("../secrets.json")["cookie-secret"];
const csurf = require("csurf");
const compression = require("compression");
const path = require("path");
const { hash, compare } = require("./bcrypt");
const { insertUser } = require("./db");

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

app.post("/registration", (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    hash(password)
        .then((passwordHash) => {
            insertUser(firstName, lastName, email, passwordHash)
                .then((result) => {
                    const { id } = result.rows[0];
                    req.session.userId = id;
                    res.status(200).json({
                        success: "User inserted successfully",
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                        error: "Error in /registration route",
                    });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: "Error in /registration route",
            });
        });
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
