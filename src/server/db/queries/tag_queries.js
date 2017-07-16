const knex = require('../knex');

// *** query helper *** //

function tags() {
  return knex('tags');
}

// *** tag queries *** //

function getAllTags() {
  return tags().select();
}

module.exports = {
  getAllTags
}
