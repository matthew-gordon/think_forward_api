exports.seed = (knex, Promise) => {
  return knex('comments').del() // Deletes ALL existing entries
    .then(() => { // Inserts seed entries one by one in series
      return knex('comments').insert({
        id: 1,
        body: 'This is the first comment!!!!!!!!',
        author: 5,
        article: 1
      });
    }).then(() => {
      return knex('comments').insert({
        id: 2,
        body: 'This is the Second',
        author: 4,
        article: 1
      });
    }).then(() => {
      return knex('comments').insert({
        id: 3,
        body: 'This is the third',
        author: 3,
        article: 1
      });
    }).then(() => {
      return knex('comments').insert({
        id: 4,
        body: 'fourthsies',
        author: 2,
        article: 1
      });
    }).then(() => {
      return knex('comments').insert({
        id: 5,
        body: 'another one yayyy',
        author: 1,
        article: 1
      })
    }).then(() => {
      return knex('comments').insert({
        id: 6,
        body: 'leastly and lastly',
        author: 3,
        article: 2
      })
    }).then(() => {
      return knex('comments').insert({
        id: 7,
        body: 'whoa.',
        author: 2,
        article: 2
      })
    }).then(() => {
      return knex('comments').insert({
        id: 8,
        body: 'This is a lot of comment seeds.',
        author: 5,
        article: 3
      })
    }).then(() => {
      return knex('comments').insert({
        id: 9,
        body: '!!!',
        author: 1,
        article: 3
      })
    }).then(() => {
      return knex('comments').insert({
        id: 10,
        body: 'This is the!',
        author: 2,
        article: 4
      })
    }).then(() => {
      return knex.raw("SELECT setval('comments_id_seq', (SELECT MAX(id) FROM comments))");
    });
};
