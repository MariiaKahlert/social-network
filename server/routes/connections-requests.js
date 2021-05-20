const { app } = require("../server");
const { selectConnectionsAndRequests } = require("../db");

app.get("/connections-requests", async (req, res) => {
    const { userId } = req.session;
    try {
        const { rows } = await selectConnectionsAndRequests(userId);
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error in /connections-requests route",
        });
    }
});
