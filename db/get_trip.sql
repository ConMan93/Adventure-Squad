select t.*
from trips t
join trips_users tu on tu.trip_id = t.id
where tu.user_id = $1;