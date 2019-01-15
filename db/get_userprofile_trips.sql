SELECT t.*
FROM trips t
JOIN trips_users tu on tu.trip_id = t.id 
WHERE tu.user_id = $1;