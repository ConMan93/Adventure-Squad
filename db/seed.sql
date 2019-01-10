-- Trips table Dummy Data 
(“Let’s go on a trip!”, “Austin, TX”, “Thursday 02/21/19 9:00am returning Thursday 02/28/19 9:00am”, “Texan Bed and Breakfast”, [“Torchy’s Tacos”]),
(“That sounds great, I’ll start packing”, “Chicago, IL”, “Thursday 02/28/19 9:00am returning Thursday 03/07/19 9:00am”, “Two bedroom apartment”, [“Wrigley Field”, “Famous Tastes of Chicago Food Tour”])

-- Users table Dummy Data 
(“awesome sauce”, “password”, “awesome@email.com”, “awesome_sauce”, null),
(“corinnen”, “password”, “corinne@email.com”, “corinnerohl”, null),
(“conman”, “password”, “conman@email.com”, “conman”, null),
(“jksn”, “password”, “jksntaylor@email.com”, “jksntaylor”, null)

create table friends insert into (id serial primary key, friend_id integer references users, user_id integer references users)


