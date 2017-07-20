const knex = require('../knex');

// *** query helper *** //

function tags() {
  return knex('tags');
}

function articlesTags() {
  return knex('articles_tags');
}

// *** tag queries *** //

function getAllTags() {
  return tags().select();
}

// *** GET all users referral queries *** //
function getArticleTags(articleID) {
  return articlesTags().where('article_id', parseInt(articleID))
    .join('tags', 'tags.id', '=', 'tag_id')
    .select('name');
}

module.exports = {
  getAllTags,
  getArticleTags
}
