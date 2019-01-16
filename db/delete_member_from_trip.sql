DELETE FROM trips_users 
WHERE user_id = $1
AND trip_id = $2;

select u.*
from users u
JOIN trips_users tu ON tu.user_id = u.id
WHERE tu.trip_id = $2;