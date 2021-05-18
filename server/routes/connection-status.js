const { app } = require("../server");
const {
    getConnectionStatus,
    insertConnection,
    updateConnectionStatus,
    deleteConnection,
} = require("../db");

const sendJson = (userId, rows, res) => {
    if (rows.length === 0) {
        return res.status(200).json({
            btnText: "Connect",
        });
    }
    if (rows[0].accepted) {
        return res.status(200).json({
            btnText: "Disconnect",
        });
    }

    if (!rows[0].accepted) {
        if (rows[0].recipient_id === userId) {
            return res.status(200).json({
                btnText: "Accept",
            });
        } else {
            return res.status(200).json({
                btnText: "Cancel",
            });
        }
    }
};

app.get("/connection-status", async (req, res) => {
    const { userId: loggedInUser } = req.session;
    const { q: otherUser } = req.query;
    try {
        const { rows } = await getConnectionStatus(loggedInUser, otherUser);
        sendJson(loggedInUser, rows, res);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error in GET /connection-status route",
        });
    }
});

app.post("/connection-status", async (req, res) => {
    const { userId: loggedInUsed } = req.session;
    const { btnText, otherUser } = req.body;
    try {
        if (btnText === "Connect") {
            const { rows } = await insertConnection(loggedInUsed, otherUser);
            sendJson(loggedInUsed, rows, res);
            return;
        }

        if (btnText === "Accept") {
            const { rows } = await updateConnectionStatus(
                loggedInUsed,
                otherUser
            );
            sendJson(loggedInUsed, rows, res);
            return;
        }

        if (btnText === "Disconnect" || btnText === "Cancel") {
            const { rows } = await deleteConnection(loggedInUsed, otherUser);
            sendJson(loggedInUsed, rows, res);
            return;
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error in POST /connection-status route",
        });
    }
});
