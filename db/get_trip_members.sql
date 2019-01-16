select u.username, u.profile_img, u.id
from users u
join trips_users tu on tu.user_id = u.id
where tu.trip_id = $1;



