INSERT INTO discussion (user_id, trip_id, message)
VALUES (${user_id}, ${trip_id}, ${message});

SELECT *
FROM discussion
WHERE trip_id = ${trip_id};