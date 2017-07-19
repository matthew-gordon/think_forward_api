const knex = require('../db/knex');
const queries = require('../db/queries/article_queries');
const joinJs = require('join-js').default;

// async function byComment(req, res, next) {
//   let comment = await knex('comments').first().where({id: comment});
//
//   console.log(comment);
//
//   return next();
// }

async function get(req, res, next) {
  const user = res.locals.user;
  const article = res.locals.article;
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

  let comments = await knex('comments')
    .select(
      ...getSelect('comments', 'comment', commentFields),
      ...getSelect('users', 'author', userFields),
      'followers.id as author_following'
    )
    .where({article: article.id})
    .leftJoin('users', 'comments.author', 'users.id')
    .leftJoin('followers', function() {
      this
        .on('users.id', '=', 'followers.user')
        .onIn('followers.follower', [user && user.id])
    });

  comments = joinJs
      .map(comments, relationsMaps, 'commentMap', 'comment_')
      .map(c => {
        delete c.author.id
        c.author.following = Boolean(c.author.following)
        return c
      })

  console.log(comments, '**** comments ****');
  res.status(200).json({ status: 'success', comments: comments });
}

async function post(req, res, next) {
  const body = req.body.comment_input;
  console.log(res.locals, '*** LOCALS ESSAY ***');
  const user = {
    id: 3,
    username: 'matt'
  }
  const article = res.locals.article;

  let comment = {};
  // const opts = {abortEarly: false};

  comment.author = user.id;
  comment.article = article.id;
  comment.body = body;

  comment = await knex('comments').insert(comment);

  const author = knex('users')
  .first('username', 'bio', 'image', 'id')
  .where({id: user.id});

  comment.author = author;

  res.status(200).json({ status: 'success', message: 'Comment added.' });
}

// helper function for aliasing
function getSelect(table, prefix, fields) {
  return fields.map(field => `${table}.${field} as ${prefix}_${field}`);
}

module.exports = {
  // byComment,
  get,
  post
}
