INSERT INTO trips (housing, origin_state, origin_city, destination_state, destination_city, leaving_date, returning_date, leaving_aiport, returning_airport)
VALUES ($2, $3, $4, $5, $6, $7, $8, $9, $10)

SELECT * from trips
WHERE id = $1;
