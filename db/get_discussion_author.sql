SELECT u.username, u.email
FROM users u
JOIN discussion d on d.user_id = u.id
WHERE d.user_id = $1;