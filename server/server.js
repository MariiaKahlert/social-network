const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const cookieSecret = require("../secrets.json")["cookie-secret"];
const csurf = require("csurf");
const compression = require("compression");
const path = require("path");
const { hash, compare } = require("./bcrypt");
const cryptoRandomString = require("crypto-random-string");
const { insertUser, selectUser, insertCode } = require("./db");
const { sendEmail } = require("./ses");

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

app.post("/registration", (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    hash(password)
        .then((passwordHash) => {
            insertUser(firstName, lastName, email, passwordHash)
                .then((result) => {
                    // Check if result.rows is not empty ?
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

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    selectUser(email)
        .then((result) => {
            compare(password, result.rows[0].password_hash)
                .then((match) => {
                    if (match === true) {
                        req.session.userId = result.rows[0].id;
                        res.status(200).json({
                            success: "Valid password",
                        });
                    } else {
                        res.status(500).json({
                            error: "Invalid password",
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                        error: "Error in /login route",
                    });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: "Error in /login route",
            });
        });
});

app.post("/password/reset/start", (req, res) => {
    selectUser(req.body.email)
        .then((result) => {
            if (result.rows.length > 0) {
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                const email = result.rows[0].email;
                insertCode(secretCode, email)
                    .then((result) => {
                        if (result.rows.length > 0) {
                            sendEmail(
                                result.rows[0].email,
                                `Here is your confirmation code: ${result.rows[0].code}`,
                                "Reset password"
                            );
                            res.status(200).json({
                                success:
                                    "Email with the code sent successfully!",
                            });
                        } else {
                            res.status(500).json({
                                error: "Failed to insert code",
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json({
                            error: "Error in insertCode",
                        });
                    });
            } else {
                res.status(500).json({
                    error: "Invalid email",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: "Error in /password/reset/start route",
            });
        });
});

app.post("/password/reset/verify", (req, res) => {
    console.log(req.body);
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
