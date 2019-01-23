DELETE FROM discussion
WHERE id = ${id};

SELECT *
FROM discussion
WHERE trip_id = ${trip_id}
ORDER BY id;