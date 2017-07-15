const knex = require('../knex');

// *** query helper *** //

function articles() {
  return knex('articles');
}

// *** article queries *** //

function getAllArticles() {
  return articles().select();
}

module.exports = {
  getAllArticles
}
