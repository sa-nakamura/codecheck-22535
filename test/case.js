'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;

const queryKnex = require('./lib.js').queryKnex;

describe("Challenge's", () => {

  describe('showAll.sql query result', () => {
    let requisiteSetup;

    it('has 100 rows (there are currently 100 total users)', () => {
      return queryKnex('showAll.sql').then( results => {
        expect(results).to.have.lengthOf(100, results);
      });
    });

    it('includes all required data of each user', () => {
      return queryKnex('showAll.sql').then( results => {
        results.forEach( user => {
          expect(user.id).to.exist;
          expect(user.name).to.exist;
          expect(user.password).to.exist;
          expect(user.created_at).to.exist;
        });
      });
    });
  });

  describe('where.sql query result', () => {

    it('has 88 rows (there are 88 non-deleted users)', () => {
      return queryKnex('where.sql').then( users => {
        expect(users).to.have.lengthOf(88);
      });
    });
    it('includes no deleted users', () => {
      return queryKnex('where.sql').then( users => {
        users.forEach( user => {
          assert.isNull(user.deleted_at, 'MUST NOT be deleted');
        });
      });
    });
  });

  describe('column.sql query result', () => {
    let path = 'column.sql';

    it('has 88 rows (there are 88 non-deleted users)', () => {
      return queryKnex(path).then( users => {
        assert.lengthOf(users, 88);
      });
    });
    it('contains no passwords', () => {
      return queryKnex(path).then( users => {
        users.forEach( user => {
          assert.isUndefined(user.password, 'MUST NOT have password');
        });
      });
    });
    it('includes no deleted users', () => {
      return queryKnex(path).then( users => {
        users.forEach( user => {
          assert.isNull(user.deleted_at, 'deleted users MUST NOT be included');
        });
      });
    });
  });
  describe('showDuplicates.sql query result', () => {

    it('shows 2 rows when there is 1 duplicate pair', () => {
      return queryKnex('showDuplicates.sql')
      .then( results => {
        expect(results).to.have.lengthOf(2, results);
      });
    });

    it('shows correct duplicated row details when there is 1 duplicate pair', () => {
      return queryKnex('showDuplicates.sql')
      .then( results => {
        expect(results).to.be.ok;
        results.forEach( row => {
          expect(results[0].name).to.equal("Brenda Lawson", results);
          expect(results[0].created_at).to.equal("2015-02-22 04:24:47", results);
        });
      });
    });
  });

  describe('deleteDuplicates.sql query result', () => {
    it('deletes older row when there is 1 duplicate pair', () => {
      let totalUsers;
      return queryKnex('showAll.sql')
      .then( results => {
        totalUsers = results.length;
      })
      .then( () => { return queryKnex('deleteDuplicates.sql') })
      .then( () => { return queryKnex('showAll.sql') })
      .then( results => {
        expect(results).to.have.lengthOf(totalUsers-1, results);
      })
      .then( () => { return queryKnex('findBrenda.sql') })
      .then( results => {
        expect(results).to.have.lengthOf(0, results);
      });
    });
  });

  describe('insertJohn.sql query result', () => {
    it('successfully inserts John into users', () => {
      let totalUsers;
      return queryKnex('showAll.sql')
      .then( results => {
        totalUsers = results.length;
      })
      .then( () => { queryKnex('createJohn.sql') })
      .then( () => { return queryKnex('showAll.sql') })
      .then( results => {
        expect(results).to.have.lengthOf(totalUsers+1);
      })
      .then( () => { return queryKnex('findJohn.sql') })
      .then( results => {
        expect(results).to.have.lengthOf(1);
      });
    });
  });
});
