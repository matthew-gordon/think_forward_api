const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const knex = require('../../src/server/db/knex');
const server = require('../../src/server/app');

chai.use(chaiHttp);

describe('TAGS API routes', () => {

  beforeEach(() => {
    return knex.migrate.latest()
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.latest();
  });

  describe('GET /tags', () => {
    it('should return all tags', (done) => {
      chai.request(server)
      .get('/tags')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.eql('success');
        res.body.tags[0].should.include.keys(
          'id',
          'name'
        );
        done();
      });
    });
  });

});
