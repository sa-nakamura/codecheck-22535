-- table: users
-- Show duplicated entries here

SELECT *
FROM
    users
GROUP BY
    name
HAVING COUNT(name) > 1 ;