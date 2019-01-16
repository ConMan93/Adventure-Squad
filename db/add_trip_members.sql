insert into trips_users (user_id, trip_id)
values ($1, $2);

select u.*
from users u
JOIN trips_users tu ON tu.user_id = u.id
WHERE tu.trip_id = $2;