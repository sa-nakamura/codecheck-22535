-- table: users
-- Delete the older entry (larger id) of any duplicated entries.

DELETE *
FROM
    users
WHERE id < (
 SELECT max(id)
 FROM
    users
 GROUP BY
    name
 HAVING COUNT(name) > 1 ;
)