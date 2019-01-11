INSERT INTO trips_users (user_id, trip_id)
VALUES (${user_id}, ${trip_id})
returning *;