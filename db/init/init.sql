-- create table users (
--     id serial primary key,
--     username varchar,
--     password varchar,
--     email varchar,
--     venmo varchar,
--     profile_img text
-- );

-- create table trips (
--     id serial primary key,
--     location text,
--     housing text,
--     origin_state varchar,
--     origin_city varchar,
--     destination_state varchar,
--     destination_city varchar,
--     leaving_date text,
--     returning_date text
-- );

-- create table trips_users (
--     id serial primary key,
--     user_id integer references users,
--     trip_id integer references trips
-- );

-- create table friends (
--     id serial primary key,
--     friend_id integer references users,
--     user_id integer references users
-- );

-- CREATE TABLE discussion (
--     id serial primary key,
--     user_id integer references users,
--     trip_id integer references trips,
--     message text
-- );