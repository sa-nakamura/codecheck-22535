## SQL Challenge
Write some basic queries to pass the tests. Details are given in the following part.

Table `users` is created for you in sqlite database `db.sqlite` in the root folder. Table structure is given in [create.sql](sql/create.sql).
```
CREATE TABLE users ( id integer PRIMARY KEY AUTOINCREMENT, name text NOT NULL, password text NOT NULL, gender integer, created_at text NOT NULL, deleted_at text NULL);
```
You can check the data in `users` table from [insert.sql](sql/insert.sql).

Some rules about data structure.
- gender:
  - 1 for male
  - 2 for female
- deleted_at
  - Contains date time of users deleted.
  - This column will be null, if user is present i.e `not deleted`.
  - This type of deletiong is called `soft delete`. A key is maintained to decide whether to show the data or not.

## Challenge Description

### SELECT
Write a `select` query in [select.sql](sql/select.sql) to get all the user data from `users` table.

### WHERE
Write a `where` query in [where.sql](sql/where.sql) to get user data who are `not deleted`.

### COLUMN
Write a query in [column.sql](sql/column.sql) to get user data who are `not deleted`. *Do not fetch password column.*

### Test Results *before* solving the challenge  
Initially all the tests will fail with following output

```
codecheck: Finish with code null
codecheck: tests  : 0
codecheck: success: 0
codecheck: failure: 0
```

### Test Results *after* solving the challenge
Solve the challenge to pass the tests
```
codecheck: Finish with code 0
codecheck: tests  : 6
codecheck: success: 6
codecheck: failure: 0
```
Note: Tests also include tests for first challenge of sprint2. If you have cleared the first challenge, it will pass here also w/o any modifications.

--- --- ---

## Run Tests
To run tests locally install codecheck in local environment by running following command in terminal.
```
$ npm install codecheck -g
```
To run tests locally, run `codecheck` command in terminal in the root folder
To run tests in web editor please click on `RUN` button on left side of web editor
