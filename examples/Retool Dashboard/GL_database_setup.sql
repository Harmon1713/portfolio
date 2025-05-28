CREATE TABLE tracks (
    id SERIAL PRIMARY KEY,
    track_id VARCHAR(50),
    name VARCHAR(255),
    popularity INT,
    album_id VARCHAR(50),
    date_recorded DATE
);

CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    album_id VARCHAR(50),
    name VARCHAR(255),
    release_date DATE,
    popularity INT
);

CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    playlist_id VARCHAR(50),
    name VARCHAR(255),
    track_id VARCHAR(50),
    inclusion_date DATE
);

CREATE TABLE followers (
    id SERIAL PRIMARY KEY,
    artist_id VARCHAR(50),
    follower_count INT,
    date_recorded DATE
);
