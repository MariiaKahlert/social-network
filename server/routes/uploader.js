const { app } = require("../server");
const { upload, deleteImage } = require("../utils/s3");
const { s3Url } = require("../../config.json");
const { updateImgUrl, getUserInfo } = require("../db");
const path = require("path");
const multer = require("multer");
const uidSafe = require("uid-safe");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

app.post("/upload", uploader.single("file"), upload, async (req, res) => {
    if (req.file) {
        const { filename } = req.file;
        const { userId } = req.session;
        const fullUrl = s3Url + filename;
        try {
            const previousImgUrl = (
                await getUserInfo(userId)
            ).rows[0].img_url.slice(s3Url.length);
            await deleteImage(previousImgUrl);
            const result = await updateImgUrl(fullUrl, userId);
            res.json(result.rows[0]);
        } catch (err) {
            console.log(err);
            res.status(500).json({
                error: "Error in /upload route",
            });
        }
    }
});
