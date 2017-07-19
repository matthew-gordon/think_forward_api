const knex = require('../db/knex');
const queries = require('../db/queries/article_queries');
const joinJs = require('join-js').default;

async function bySlug(req, res, next) {
  res.locals.user = {
    id: 3,
    username: 'matt'
  }

  const { user } = res.locals;

  // console.log(res.locals);
  if (!req.params.slug) {
    res.status(404).send({
      status: 'error',
      message: 'Not found.'
    });
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
    .where({article: article.id});

  let tagList = [];

  if (tagsRelations && tagsRelations.length > 0) {
    tagList = await knex('tags')
      .select()
      .whereIn('id', tagsRelations.map(r => r.tag))

    tagList = tagList.map(t => t.name);
  }

  article.tagList = tagList;

  article.favorited = false;

  const author = await knex('users')
    .first('username', 'bio', 'image', 'id')
    .where({id: article.author});

  article.author = author;

  article.author.following = false;

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


  res.locals.article = article;
  res.locals.favorites = favorites;
  res.locals.author = author;
  res.locals.tagList = tagList;
  res.locals.tagRelations = tagsRelations;

  delete res.locals.author.id;

  await next();
}

async function get(req, res, next) {
  const user = { id: 3, username: 'matt' }

  const userFields = ['id', 'image', 'bio', 'username'];
  const articleFields = [
    'id',
    'slug',
    'title',
    'body',
    'description',
    'favorites_count',
    'created_at',
    'updated_at'
  ];
  const commentFields = [
    'id',
    'body',
    'created_at',
    'updated_at'
  ];
  const relationsMaps = [
    {
      mapId: 'articleMap',
      idProperty: 'id',
      properties: [...articleFields, 'favorited'],
      associations: [
        {name: 'author', mapId: 'userMap', columnPrefix: 'author_'}
      ],
      collections: [
        {name: 'tagList', mapId: 'tagMap', columnPrefix: 'tag_'}
      ]
    },
    {
      mapId: 'commentMap',
      idProperty: 'id',
      properties: [...commentFields],
      associations: [
        {name: 'author', mapId: 'userMap', columnPrefix: 'author_'}
      ]
    },
    {
      mapId: 'userMap',
      idProperty: 'id',
      properties: [...userFields, 'following']
    },
    {
      mapId: 'tagMap',
      idProperty: 'id',
      properties: ['id', 'name']
    }
  ];
  let limit = 10;
  let offset = 10;
  const { author, tag, favorited} = res.locals;

  // Get all articles
  let articlesQuery = knex('articles')
    .select(
      ...getSelect('articles', 'article', articleFields),
      ...getSelect('users', 'author', userFields),
      ...getSelect('articles_tags', 'tag', ['id']),
      ...getSelect('tags', 'tag', ['id', 'name']),
      'favorites.id as article_favorited',
      'followers.id as author_followed'
    )
    .limit(limit)
    // .offset(offset)
    .orderBy('articles.created_at', 'desc');

  // // Get article count
  let articleCount = knex('articles').count();
  //
  if (author && author.length > 0) {
    const subQuery = knex('users')
      .select('id')
      .whereIn('username', author);

    articlesQuery = articlesQuery.andWhere('articles.author', 'in', subQuery);
  }

  // Get article favorites
  if (favorited && favorited.length > 0) {
    const subQuery = knex('favorites')
    .whereIn(
      'user',
      knex('users').select('id').whereIn('username', favorited)
    );

    articleQuery = articleQuery.andWhere('articles.id', 'in', subQuery);
    articleCount = articleCount.andWhere('articles.id', 'in', subQuery);
  }

  // const tags = await knex('tags').pluck('name');


  // Get article tags
  if (tag && tag.length > 0) {
    console.log(tag);
    const subQuery = knex('articles_tags')
      .select('article')
      .whereIn(
        'tag',
        knex('tags').select('id').whereIn('name', tag)
      )

    articlesQuery = articlesQuery.andWhere('articles.id', 'in', subQuery)
    conutQuery = conutQuery.andWhere('articles.id', 'in', subQuery)
  }

  // TODO: Figure out why .join doesn't work
  articlesQuery = articlesQuery
      .leftJoin('users', 'articles.author', 'users.id')
      .leftJoin('articles_tags', 'articles.id', 'articles_tags.article')
      .leftJoin('tags', 'articles_tags.tag', 'tags.id')
      .leftJoin('favorites', function () {
        this.on('articles.id', '=', 'favorites.article')
          .onIn('favorites.user', [user && user.id])
      })
      .leftJoin('followers', function () {
        this.on('articles.author', '=', 'followers.user')
          .onIn('followers.follower', [user && user.id])
      })

    let [articles, [countRes]] = await Promise.all([articlesQuery, articleCount])

  articles = joinJs
    .map(articles, relationsMaps, 'articleMap', 'article_')
    .map(a => {
      a.favorited = Boolean(a.favorited)
      a.tagList = a.tagList.map(t => t.name)
      a.author.following = Boolean(a.author.following)
      delete a.author.id
      return a;
    });

  let articlesCount = countRes.count || conutRes['count(*)'];
  articlesCount = Number(articlesCount);

  res.status(200).json({
    status: 'success',
    articles_count: articlesCount,
    articles
  });
}

// helper function for aliasing
function getSelect(table, prefix, fields) {
  return fields.map(field => `${table}.${field} as ${prefix}_${field}`);
}

async function getOne(req, res, next) {
  // res.body = {article: res.locals.article};
  res.status(200).send(res.locals.article)
}

async function del(req, res, next) {
  const userId = res.locals.user.id;
  const article = res.locals.article;
  // if (article.author.id !== userId) {
  //   res.status(403).json({
  //     status: 'error',
  //     message: 'Not owned by user.'
  //   });
  // }

  await Promise.all([
    knex('favorites')
      .del()
      .where({ user: userId, article: article.id }),
    knex('articles_tags')
      .del()
      .where({id: article.id}),
    knex('articles')
      .del()
      .where({id: article.id})
  ])

  res.status(200).json({ status: 'success', message: 'Article deleted.' });
}

module.exports = {
  bySlug,
  get,
  getOne,
  del
}
