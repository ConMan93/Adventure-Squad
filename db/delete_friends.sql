DELETE FROM friends
where id = $1;

select f.*, u.id as users_id
from friends f
join users u on u.id = f.user_id
where u.id = $2;