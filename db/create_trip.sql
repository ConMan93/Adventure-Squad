INSERT INTO trips (origin_state, origin_city, destination_state, destination_city, leaving_date, returning_date)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

