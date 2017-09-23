DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS events;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR(200) NOT NULL,
    last VARCHAR(200) NOT NULL,
    email VARCHAR(300) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- INSERT INTO users (first, last, email, password) VALUES ('disco', 'duck', 'disco@duck.com', '1234');
--
--
-- CREATE TABLE userevent  (
--     id SERIAL PRIMARY KEY,
--     created_by_user_id INTEGER REFERENCES users(id) NOT NULL,
--     company
--     rating
--     artist_id
--     event_id
--     level
--     section
--     row
--     seat
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
--
--
--
-- CREATE TABLE events (
--     id SERIAL PRIMARY KEY,
--     created_by_user_id INTEGER REFERENCES users(id) NOT NULL,
--     date
--     time
--     venueid
--     recipient_id INTEGER NOT NULL,
--     status VARCHAR(300) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
--
--
-- CREATE TABLE venues (
--     id SERIAL PRIMARY KEY,
--     created_by_user_id INTEGER REFERENCES users(id) NOT NULL,
--     venueid
--     adress
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
--
--
-- CREATE TABLE genres (
--     id SERIAL PRIMARY KEY,
--     created_by_user_id INTEGER REFERENCES users(id) NOT NULL,
--     genres
--     artist_id
--     event_id
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
--
--
-- CREATE TABLE artists (
--     id SERIAL PRIMARY KEY,
--     created_by_user_id INTEGER REFERENCES users(id) NOT NULL,
--     genres
--     artist_id
--     event_id
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
--
--
-- CREATE TABLE tour (
--     id SERIAL PRIMARY KEY,
--     created_by_user_id INTEGER REFERENCES users(id) NOT NULL,
--     genre
--     artist_id
--     event_id
--     setlist
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
