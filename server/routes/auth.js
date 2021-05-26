const { app } = require("../server");
const { hash, compare } = require("../utils/bcrypt");
const { s3Url } = require("../../config.json");
const { deleteImage } = require("../utils/s3");
const {
    insertUser,
    selectUser,
    deleteUser,
    deleteUserMessages,
    deleteUserConnections,
    deleteUserCodes,
    getUserInfo,
} = require("../db");

app.post("/registration", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        res.status(400).json({
            error: "Something is missing to proceed",
        });
        return;
    }
    try {
        const passwordHash = await hash(password);
        const result = await insertUser(
            firstName,
            lastName,
            email,
            passwordHash
        );
        const { id } = result.rows[0];
        req.session.userId = id;
        res.status(200).json({
            success: "User inserted successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error in /registration route",
        });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await selectUser(email);
        const match = await compare(password, result.rows[0].password_hash);
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
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error in /login route",
        });
    }
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome#/login");
});

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
