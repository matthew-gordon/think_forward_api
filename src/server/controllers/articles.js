const knex = require('../db/knex');
const queries = require('../db/queries/article_queries');

async function bySlug(req, res, next) {
  if (!req.params.slug) {
    res.status(404).send({
      status: 'error',
      message: 'Not found.'
    })
  }

  const article = await knex('articles')
    .first()
    .where('slug', req.params.slug)

  if (!article) {
    res.status(404).send({
      status: 'error',
      message: 'Not Found.'
    });
  }

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

  article.author.following = false;

  const user = {
    id: 3,
    username: 'matt'
  };

  // check if is self or if user is following author
  if (user && user.username !== article.author.username) {

    const res = await knex('followers')
      .where({
        user: article.author.id,
        follower: user.id
      })
      .select();

    if (res.length > 0) {
      article.author.following = true;
    }
  }

  let favorites = [];

  if (user) {
    favorites = await knex('favorites')
      .where({
        user: user.id,
        article: article.id
      })
      .select();

    if (favorites.length > 0) {
      article.favorited = true;
    }
  }


  req.params.article = article;
  req.params.favorites = favorites;
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
