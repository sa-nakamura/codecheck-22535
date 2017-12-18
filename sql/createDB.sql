DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id integer PRIMARY KEY AUTOINCREMENT,
  name text NOT NULL,
  password text NOT NULL,
  gender integer,
  created_at text NOT NULL,
  deleted_at text NULL
);

-- CREATE TABLE oden (
--   id integer PRIMARY KEY AUTOINCREMENT,
--   FOREIGN KEY(userId) REFERENCES Authors(AuthorId))
--    title text NOT NULL,
