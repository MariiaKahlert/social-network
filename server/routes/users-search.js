const { app } = require("../server");
const { selectUsers, selectUsersWithSearchInput } = require("../db");

app.get("/find-users", async (req, res) => {
    try {
        const result = await selectUsers();
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error in GET /find-users route",
        });
    }
});

app.post("/find-users", async (req, res) => {
    const { searchInput } = req.body;
    try {
        const result = await selectUsersWithSearchInput(searchInput);
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error in POST /find-users route",
        });
    }
});
