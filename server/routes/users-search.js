const { app } = require("../server");
const { selectUsers, selectUsersWithSearchInput } = require("../db");

app.get("/find-users", async (req, res) => {
    const { q: searchInput } = req.query;
    try {
        if (searchInput) {
            const { rows } = await selectUsersWithSearchInput(searchInput);
            res.json(rows);
            return;
        }
        const { rows } = await selectUsers();
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error in GET /find-users route",
        });
    }
});
