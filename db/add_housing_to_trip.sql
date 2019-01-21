INSERT
INTO housing (trip_id, name, latitude, longitude, address, phone, daily_price)
VALUES (${trip_id}, ${name}, ${latitude}, ${longitude}, ${address}, ${phone}, ${daily_price})
RETURNING *;