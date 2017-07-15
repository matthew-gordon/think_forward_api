'use strict';

const bcrypt = require('bcryptjs');
const queries = require('../db/queries');
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


module.exports = {
  comparePass: comparePass,
  createUser: createUser,
  loginUser: loginUser
}
