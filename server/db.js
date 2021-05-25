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

module.exports.selectUsers = () => {
    return db.query(
        `
            SELECT id, first_name, last_name, img_url
            FROM users
            ORDER BY id DESC
            LIMIT 3
        `
    );
};

module.exports.selectUsersWithSearchInput = (searchInput) => {
    return db.query(
        `
            SELECT id, first_name, last_name, img_url
            FROM users
            WHERE first_name ILIKE $1
            ORDER BY first_name ASC
        `,
        [`${searchInput}%`]
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

module.exports.getUserInfo = (userId) => {
    return db.query(
        `
            SELECT id, first_name, last_name, img_url, bio
            FROM users
            WHERE id = $1
        `,
        [userId]
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

module.exports.updateImgUrl = (fullUrl, userId) => {
    return db.query(
        `
            UPDATE users
            SET img_url = $1
            WHERE id = $2
            RETURNING *
        `,
        [fullUrl, userId]
    );
};

module.exports.updateBio = (bio, userId) => {
    return db.query(
        `
            UPDATE users
            SET bio = $1
            WHERE id = $2
            RETURNING *
        `,
        [bio, userId]
    );
};

module.exports.getConnectionStatus = (loggedInUser, otherUser) => {
    return db.query(
        `
            SELECT * FROM connections
            WHERE (recipient_id = $1 AND sender_id = $2)
            OR (recipient_id = $2 AND sender_id = $1)
        `,
        [loggedInUser, otherUser]
    );
};

module.exports.insertConnection = (loggedInUser, otherUser) => {
    return db.query(
        `
            INSERT INTO connections (sender_id, recipient_id)
            VALUES ($1, $2)
            RETURNING *
        `,
        [loggedInUser, otherUser]
    );
};

module.exports.updateConnectionStatus = (loggedInUser, otherUser) => {
    return db.query(
        `
            UPDATE connections
            SET accepted = 'true'
            WHERE sender_id = $2
            AND recipient_id = $1
            RETURNING *
        `,
        [loggedInUser, otherUser]
    );
};

module.exports.deleteConnection = (loggedInUser, otherUser) => {
    return db.query(
        `
            DELETE FROM connections
            WHERE (recipient_id = $1 AND sender_id = $2)
            OR (recipient_id = $2 AND sender_id = $1)
        `,
        [loggedInUser, otherUser]
    );
};

module.exports.selectConnectionsAndRequests = (userId) => {
    return db.query(
        `
            SELECT users.id, first_name, last_name, img_url, accepted
            FROM connections
            JOIN users
            ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
            OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
            OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
        `,
        [userId]
    );
};

module.exports.insertMessage = (message, userId) => {
    return db.query(
        `
            INSERT INTO messages (message, sender_id)
            VALUES ($1, $2)
            RETURNING *
        `,
        [message, userId]
    );
};

module.exports.selectMessages = () => {
    return db.query(
        `
            SELECT messages.id, sender_id, first_name, last_name, img_url, message, messages.created_at
            FROM users
            JOIN messages ON messages.sender_id = users.id
            ORDER BY messages.id DESC
            LIMIT 10 
        `
    );
};

module.exports.selectMoreMessages = (id) => {
    return db.query(
        `
            SELECT messages.id, sender_id, first_name, last_name, img_url, message, messages.created_at
            FROM users
            JOIN messages ON messages.sender_id = users.id
            WHERE messages.id < $1
            ORDER BY messages.id DESC
            LIMIT 10 
        `,
        [id]
    );
};
