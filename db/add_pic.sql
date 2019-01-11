update users
set profile_img = $1
where id = $2

returning profile_img;
