const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const knex = require('../../src/server/db/knex');
const server = require('../../src/server/app');

chai.use(chaiHttp);

describe('ARTICLE API routes', () => {

  beforeEach(() => {
    return knex.migrate.latest()
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.latest();
  });

  describe('GET /articles', () => {
    it('should return all articles', (done) => {
      chai.request(server)
      .get('/articles')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.eql('success');
        res.body.articles[0].should.include.keys(
          'slug',
          'title',
          'body',
          'description',
          'favorites_count',
          'author'
        );
        done();
      });
    });
  });

});
