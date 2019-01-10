INSERT INTO friends (friend_id, user_id)
VALUES ($1, $2);

select u.*
from users u
join friends f on f.friend_id = u.id
where f.user_id = $2;