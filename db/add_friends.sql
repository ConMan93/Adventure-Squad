INSERT INTO friends (friend_id, user_id)
VALUES ($1, $2);

SELECT * 
FROM friends
WHERE user_id =$2;