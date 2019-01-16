SELECT u.username, u.profile_img, u.venmo, u.email, u.id 
FROM users u
JOIN friends f
on f.friend_id = u.id
WHERE f.friend_id NOT IN (
    SELECT user_id FROM trips_users
    WHERE trip_id = $1
);

