const { app } = require("../server");
const {
    selectConnectionsAndRequests,
    selectOtherConnections,
} = require("../db");

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

app.get("/other-connections", async (req, res) => {
    const { q: otherUserId } = req.query;
    const { userId: loggedInUserId } = req.session;
    try {
        const { rows } = await selectOtherConnections(otherUserId);
        const withoutLoggedInUser = rows.filter(
            (user) => user.id !== loggedInUserId
        );
        res.json(withoutLoggedInUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error in /other-connections route",
        });
    }
});
