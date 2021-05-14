const { app } = require("../server");
const { getUserInfo } = require("../db");

app.get("/user", (req, res) => {
    const { userId } = req.session;
    getUserInfo(userId)
        .then((result) => res.json(result.rows[0]))
        .catch((err) => console.log(err));
});

app.get("/other-user/:id", (req, res) => {
    const { id } = req.params;
    if (parseInt(id) === req.session.userId) {
        res.status(400).json({
            error: "The users is trying to access the url with their own id as param",
        });
        return;
    }
    getUserInfo(id)
        .then((result) => {
            if (result.rows.length === 0) {
                res.status(400).json({
                    error: "The user does not exist",
                });
                return;
            }
            res.json(result.rows[0]);
        })
        .catch((err) => console.log(err));
});
