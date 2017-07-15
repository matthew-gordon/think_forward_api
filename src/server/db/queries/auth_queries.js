const knex = require('../knex');

// *** query helper *** //

function users() {
  return knex('users');
}

// *** auth queries *** //

function addUser(user) {
  return users().insert(user, 'id');
}

function getSingleUser(userID) {
  return users()
  .where('id', parseInt(userID))
  .first()
  .select(['username', 'image', 'bio', 'email']);
}

module.exports = {
  addUser,
  getSingleUser
}
