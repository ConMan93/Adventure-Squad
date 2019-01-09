INSERT INTO users (username, password, email, venmo, profile_img)
VALUES (${username}, ${password}, ${email}, ${venmo}, ${profile_img})
RETURNING *;