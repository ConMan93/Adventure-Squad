INSERT INTO discussion (user_id, trip_id, message, date)
VALUES (${user_id}, ${trip_id}, ${message}, ${date});

SELECT *
FROM discussion
WHERE trip_id = ${trip_id};