const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("../../secrets.json");
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

module.exports.upload = (req, res, next) => {
    if (!req.file) {
        return res.sendStatus(500);
    }

    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "mkahlert-imageboard",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            next();
        })
        .catch((err) => {
            console.log("error in s3 upload put object", err);
            res.sendStatus(404);
        });
};

module.exports.deleteImage = (imgUrl) => {
    return s3
        .deleteObject({
            Bucket: "mkahlert-imageboard",
            Key: imgUrl,
        })
        .promise();
};
