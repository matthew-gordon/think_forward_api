'use strict';

const bcrypt = require('bcryptjs');
const queries = require('../db/queries/auth_queries');
const knex = require('../db/knex');
const localAuth = require('./local');

function loginUser(username) {
  return knex('users').where({username}).first();
}

function createUser(req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);

  return queries.addUser({ username: req.body.username, password: hash })
  .returning('*');
}

function comparePass(userPassword, databasePassword) {
  const bool = bcrypt.compareSync(userPassword, databasePassword);

  if (!bool) return false;
  else return true;
}

function ensureAuthenticated(req, res, next) {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({
      status: 'Please log in'
    });
  }
  // decode the token
  var header = req.headers.authorization.split(' ');
  var token = header[1];
  localAuth.decodeToken(token, (err, payload) => {
    if (err) {
      return res.status(401).json({
        status: 'Token has expired'
      });
    } else {
      // check if the user still exists in the db
      return queries.getSingleUser(payload.sub.id).first()
      .then((user) => {
        return res.status(200).json({
          status: 'success',
          user
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: 'error'
        });
      });
    }
  });
}

module.exports = {
  comparePass,
  createUser,
  loginUser,
  ensureAuthenticated
}
