INSERT INTO friends (friend_id, user_id)
VALUES ($1, $2);

SELECT u.* 
FROM users u
join friends f on f.friend_id = u.id
WHERE f.user_id = $2;