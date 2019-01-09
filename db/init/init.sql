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
--     discussion text[],
--     location text,
--     flight text,
--     housing text,
--     itinerary text[]
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