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

module.exports.updateUser = (passwordHash, email) => {
    return db.query(
        `
            UPDATE users
            SET password_hash = $1
            WHERE email = $2
            RETURNING *
        `,
        [passwordHash, email]
    );
};

module.exports.insertCode = (code, email) => {
    return db.query(
        `
            INSERT INTO codes (code, email)
            VALUES ($1, $2)
            RETURNING *
        `,
        [code, email]
    );
};

module.exports.selectCode = (email) => {
    return db.query(
        `  
            SELECT * FROM codes
            WHERE email = $1
            AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
            ORDER BY created_at DESC
            LIMIT 1
        `,
        [email]
    );
};
