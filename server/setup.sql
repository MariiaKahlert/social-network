DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS codes;

CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    first_name    VARCHAR NOT NULL CHECK (first_name != ''),
    last_name     VARCHAR NOT NULL CHECK (last_name != ''),
    email         VARCHAR NOT NULL UNIQUE CHECK (email != ''),
    password_hash VARCHAR NOT NULL CHECK (password_hash != ''),
    img_url       TEXT,
    bio           TEXT,  
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE codes (
    id            SERIAL PRIMARY KEY,
    email         VARCHAR NOT NULL CHECK (email != ''),
    code          VARCHAR NOT NULL UNIQUE CHECK (code != ''),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);