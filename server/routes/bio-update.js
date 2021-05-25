const { app } = require("../server");
const { updateBio } = require("../db");

app.post("/update-bio", async (req, res) => {
    const { bio } = req.body;
    const { userId } = req.session;
    try {
        const result = await updateBio(bio, userId);
        res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error in /update-bio route",
        });
    }
});
