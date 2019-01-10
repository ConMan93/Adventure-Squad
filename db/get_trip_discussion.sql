SELECT *
FROM discussion
WHERE trip_id = $1
ORDER BY id;