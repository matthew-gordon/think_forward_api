const knex = require('../db/knex');
const queries = require('../db/queries/article_queries');

async function bySlug(req, res, next) {

  const article = await knex('articles')
    .first()
    .where('slug', req.params.slug)

  const tagsRelations = await knex('articles_tags')
    .where('article_id', parseInt(article.id));

  let tagList = [];

  if (tagsRelations && tagsRelations.length > 0) {
    tagList = await knex('tags')
      .select()
      .whereIn('id', tagsRelations.map(r => r.tag_id))

    tagList = tagList.map(t => t.name);
  }

  article.tagList = tagList;

  article.favorited = false;

  const author = await knex('users')
    .first('username', 'bio', 'image', 'id')
    .where({id: article.author});

  article.author = author;

  req.params.article = article;
  req.params.author = author;
  req.params.tagList = tagList;
  req.params.tagRelations = tagsRelations;

  delete req.params.author.id;
  
  await next();

}

async function getOne(req, res, next) {
  res.status(200).send(req.params.article);
}

module.exports = {
  bySlug,
  getOne
}
