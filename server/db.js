const spicedPg = require("spiced-pg");
const db = spicedPg("postgres:postgres:postgres@localhost:5432/social-network");

module.exports.insertUser = (firstName, lastName, email, passwordHash) => {
    return db.query(
        `
            INSERT INTO users (first_name, last_name, email, password_hash)
            VALUES ($1, $2, $3, $4)
            RETURNING id
        `,
        [firstName, lastName, email, passwordHash]
    );
};

module.exports.selectUser = (email) => {
    return db.query(
        `
            SELECT * FROM users
            WHERE email = $1
        `,
        [email]
    );
};
