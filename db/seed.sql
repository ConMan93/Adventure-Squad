-- Trips table Dummy Data 
(“Let’s go on a trip!”, “Austin, TX”, “Thursday 02/21/19 9:00am returning Thursday 02/28/19 9:00am”, “Texan Bed and Breakfast”, [“Torchy’s Tacos”]),
(“That sounds great, I’ll start packing”, “Chicago, IL”, “Thursday 02/28/19 9:00am returning Thursday 03/07/19 9:00am”, “Two bedroom apartment”, [“Wrigley Field”, “Famous Tastes of Chicago Food Tour”])

-- Users table Dummy Data 
(“awesome sauce”, “password”, “awesome@email.com”, “awesome_sauce”, null),
(“corinnen”, “password”, “corinne@email.com”, “corinnerohl”, null),
(“conman”, “password”, “conman@email.com”, “conman”, null),
(“jksn”, “password”, “jksntaylor@email.com”, “jksntaylor”, null)

create table friends insert into (id serial primary key, friend_id integer references users, user_id integer references users);

create table trips_users(id serial primary key, user_id int references users, trip_id int references trips);


create trips table values (id serial primary key, housing varchar, origin_state varchar, origin_city varchar, destination_state varchar, destination_city varchar, leaving_date varchar, returning_date varchar, leaving_airport varchar, returning_airport varchar);

