const fs     = require('fs');
const knex   = require('knex')({
  client: 'sqlite3',
  connection: { filename: __dirname + '/../db.sqlite' }
});

function initialize() {
  let createDB = querySQL('/../sql/createDB.sql');
  let populateDB = querySQL('/../sql/populateDB.sql');

  return Promise.all([createDB, populateDB])
  .then( () => {
    knex.destroy();
  });
};

function querySQL(path) {
// pass file content as SQL query to knex if not empty.
  let lines = fs.readFileSync( __dirname + path)
    .toString()
    .split('\n')
    .map(l => l.trim())
    .filter(l => !(l.indexOf('--') !== -1)) // remove comment lines.
    .filter(l => !(l.length === 0))
    .join('\n')
    .split(';\n')
    .map((query) => {
      return knex.raw(query)
      .then((result) => {
        return result;
      });
    });
  return Promise.all(lines)
  .then( lines => {
    return lines.filter( line => { return !!line });
  });
}

initialize();
// module.exports.initialize = initialize;
