const { app } = require("../server");
const { hash } = require("../bcrypt");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("../ses");
const { selectUser, updateUser, insertCode, selectCode } = require("../db");

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
    const { email, password, code } = req.body;
    selectCode(email)
        .then((result) => {
            if (result.rows[0].code === code) {
                hash(password)
                    .then((passwordHash) => {
                        updateUser(passwordHash, email)
                            .then(() => {
                                res.status(200).json({
                                    success: "User inserted successfully",
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(500).json({
                                    error:
                                        "Error in /password/reset/verify route",
                                });
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json({
                            error: "Error in /password/reset/verify route",
                        });
                    });
            } else {
                res.status(500).json({
                    error: "Invalid code",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: "Error in /password/reset/verify route",
            });
        });
});
