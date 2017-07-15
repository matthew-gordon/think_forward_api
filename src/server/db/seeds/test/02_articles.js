const slug = require('slug');

exports.seed = (knex, Promise) => {
  return knex('articles').del() // Deletes ALL existing entries
    .then(() => { // Inserts seed entries one by one in series
      return knex('articles').insert({
        id: 1,
        author: 5,
        title: 'New Title 1',
        slug: slug('title1', {lower: true}),
        body: 'This is the body of an article. It should be longer, but for now it will be this length.',
        description: 'This is an article description.',
      });
    }).then(() => {
      return knex('articles').insert({
        id: 2,
        author: 4,
        title: 'New Title 2',
        slug: slug('title2', {lower: true}),
        body: 'This is the body of an article. It should be longer, but for now it will be this length.',
        description: 'This is an article description.',
      });
    }).then(() => {
      return knex('articles').insert({
        id: 3,
        author: 3,
        title: 'New Title 3',
        slug: slug('title3', {lower: true}),
        body: 'This is the body of an article. It should be longer, but for now it will be this length.',
        description: 'This is an article description.',
      });
    }).then(() => {
      return knex('articles').insert({
        id: 4,
        author: 2,
        title: 'New Title 4',
        slug: slug('title4', {lower: true}),
        body: 'This is the body of an article. It should be longer, but for now it will be this length.',
        description: 'This is an article description.',
      });
    }).then(() => {
      return knex('articles').insert({
        id: 5,
        author: 1,
        title: 'New Title 1',
        slug: slug('title5', {lower: true}),
        body: 'This is the body of an article. It should be longer, but for now it will be this length.',
        description: 'This is an article description.',
      });
    }).then(() => {
      return knex.raw("SELECT setval('articles_id_seq', (SELECT MAX(id) FROM articles))");
    });
};
