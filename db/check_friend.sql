select * from friends
where user_id = $1
and friend_id = $2;