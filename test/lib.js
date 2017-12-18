const fs     = require('fs');
const expect = require('chai').expect;
const knex = require('knex')({
  client: 'sqlite3',
  connection: { filename: __dirname + '/../db.sqlite' }
});

module.exports.queryKnex = function(path) {
// pass file content as SQL query to knex if not empty.
  const lines = fs.readFileSync( `${__dirname}/../sql/${path}`).toString();

  // prevent empty queries to knex (causes SQLite driver segmentation fault)
  expect(queryableLines(lines))
      .to.have.length.of.at.least(1,`${path} contains no queries. Aborting!\n`);

  return knex.raw(lines)
  .then(results => {
    // knex.destroy()
    return results
  });
};

function queryableLines(lines) {
// remove lines that are only spaces, empty or comments.
  let reducedLines = lines
    .split('\n')
    .map(l => l.trim())
    .filter(l => !(l.indexOf('--') !== -1)) // remove comment lines.
    .filter(l => !(l.length === 0));

  return reducedLines;
}
