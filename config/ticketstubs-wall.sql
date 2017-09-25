DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS userstubs;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR(200) NOT NULL,
    last VARCHAR(200) NOT NULL,
    email VARCHAR(300) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- INSERT INTO users (first, last, email, password) VALUES ('disco', 'duck', 'disco@duck.com', '1234');

CREATE TABLE userstubs  (
    id SERIAL PRIMARY KEY,
    stub_img VARCHAR(300) NOT NULL,
    stub_owner_id INTEGER REFERENCES users(id) NOT NULL,
    users_plus_one VARCHAR(200),
    users_rating INTEGER,
    -- artist_id INTEGER REFERENCES artist(id),
    -- event_id INTEGER REFERENCES event(id),
    -- level
    -- section
    -- row
    -- seat
    event_name VARCHAR(200),
    event_date VARCHAR(200),
    event_time VARCHAR(200),
    venue VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO userstubs (stub_img, stub_owner_id, event_name, event_date, event_time, venue) VALUES ('XyIntBvWNjvr9M892i1OZn31VDRHgGv5.jpg', '1', 'BUSH', '29.9.17', '8pm', 'E-Werk Köln');
INSERT INTO userstubs (stub_img, stub_owner_id, event_name, event_date, event_time, venue) VALUES ('s_j3bNI6PlBjSal2g3oWDSRLpkgbwI36.jpg', '1', 'The Rolling Stones', '9. Okt 2017', '19:15 Uhr', 'ESPRIT arena');
INSERT INTO userstubs (stub_img, stub_owner_id, event_name, event_date, event_time, venue) VALUES ('3WxOcqaVjYPY44I0ANlRqIZCPeKgOLv4.jpg', '1', 'Rush', '29.5.11', '18.30', 'Festhalle Frankfurt');


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
