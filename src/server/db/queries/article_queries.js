const knex = require('../knex');

// *** query helper *** //

function articles() {
  return knex('articles');
}

function articlesTags() {
  return knex('articles_tags');
}

// *** article queries *** //

function getAllArticles() {
  return articles().select();
}

function getSingleArticle(articleID) {
  return articles().where('id', parseInt(articleID)).first();
}

function getArticleBySlug(articleSLUG) {
  return articles().where('slug', articleSLUG).first();
}

module.exports = {
  getAllArticles,
  getSingleArticle,
  getArticleBySlug
}
