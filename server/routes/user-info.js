const { app } = require("../server");
const { getUserInfo } = require("../db");

app.get("/user", async (req, res) => {
    const { userId } = req.session;
    try {
        const result = await getUserInfo(userId);
        res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error in /user route",
        });
    }
});

app.get("/other-user/:id", async (req, res) => {
    const { id } = req.params;
    if (parseInt(id) === req.session.userId) {
        res.status(400).json({
            error: "The users is trying to access the url with their own id as param",
        });
        return;
    }
    try {
        const result = await getUserInfo(id);
        if (result.rows.length === 0) {
            res.status(400).json({
                error: "The user does not exist",
            });
            return;
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error in /other-user/:id route",
        });
    }
});
