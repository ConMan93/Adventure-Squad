UPDATE discussion
SET message = ${message}
WHERE id = ${id}
RETURNING *;