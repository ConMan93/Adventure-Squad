SELECT t.*
FROM trips t
JOIN trips_users tu ON tu.trip_id = t.id
WHERE tu.user_id = $1;