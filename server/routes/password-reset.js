const { app } = require("../server");
const { hash } = require("../utils/bcrypt");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("../utils/ses");
const { selectUser, updateUser, insertCode, selectCode } = require("../db");

app.post("/password/reset/start", async (req, res) => {
    const { email } = req.body;
    try {
        const result = await selectUser(email);
        if (result.rows.length > 0) {
            const secretCode = cryptoRandomString({
                length: 6,
            });
            const email = result.rows[0].email;
            const anotherResult = await insertCode(secretCode, email);
            if (anotherResult.rows.length > 0) {
                await sendEmail(
                    anotherResult.rows[0].email,
                    `Here is your confirmation code: ${anotherResult.rows[0].code}`,
                    "Reset password"
                );
                res.status(200).json({
                    success: "Email with the code sent successfully!",
                });
            } else {
                res.status(500).json({
                    error: "Failed to insert code",
                });
            }
        } else {
            res.status(500).json({
                error: "Invalid email",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error in /password/reset/start route",
        });
    }
});

app.post("/password/reset/verify", async (req, res) => {
    const { email, password, code } = req.body;
    try {
        const result = await selectCode(email);
        if (result.rows[0].code === code) {
            const passwordHash = await hash(password);
            await updateUser(passwordHash, email);
            res.status(200).json({
                success: "User inserted successfully",
            });
        } else {
            res.status(500).json({
                error: "Invalid code",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error in /password/reset/verify route",
        });
    }
});
