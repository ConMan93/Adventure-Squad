UPDATE housing
SET name = ${name}, latitude = ${latitude}, longitude = ${longitude}, address = ${address}, phone = ${phone}, daily_price = ${daily_price}
WHERE trip_id = ${trip_id}
RETURNING *;