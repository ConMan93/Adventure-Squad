SELECT u.username, u.profile_img, u.venmo, u.email 
FROM users u
JOIN friends f
on f.friend_id = u.id
WHERE f.user_id = $1;