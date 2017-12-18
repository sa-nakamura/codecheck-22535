-- table: users
-- select non deleted users

SELECT *
 FROM users
 WHERE deleted_at = NUll;