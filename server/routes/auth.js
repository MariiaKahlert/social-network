const { app } = require("../server");
const { hash, compare } = require("../utils/bcrypt");
const { insertUser, selectUser } = require("../db");

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

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome#/login");
});
