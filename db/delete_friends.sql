DELETE FROM friends
where friend_id = $1;

select u.*
from users u
join friends f on f.friend_id = u.id
where f.user_id = $2;