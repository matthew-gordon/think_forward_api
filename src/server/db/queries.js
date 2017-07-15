const knex = require('./knex');

// *** query helper *** //

function users() {
  return knex('users');
}

// *** queries *** //

function addUser(user) {
  return users().insert(user);
}


module.exports = {
  addUser
}
