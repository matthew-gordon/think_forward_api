process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();

const localAuth = require('../../src/server/auth/local');

describe('auth : local', () => {

  describe('encodeToken()', () => {
    it('should return a token', () => {
      const results = localAuth.encodeToken({id: 1});
      should.exist(results);
      results.should.be.a('string');
    });
  });

  describe('decodeToken()', ()=> {
    it('should return a payload', () => {
      const token = localAuth.encodeToken({id: 1});
      should.exist(token);
      token.should.be.a('string');
      localAuth.decodeToken(token, (err, res) => {
        should.not.exist(err);
        res.sub.should.eql(1);
      });
    });
  });

});
