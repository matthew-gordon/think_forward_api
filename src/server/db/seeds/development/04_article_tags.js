exports.seed = (knex, Promise) => {
  return knex('articles_tags').del() // Deletes ALL existing entries
    .then(() => { // Inserts seed entries one by one in series
      return knex('articles_tags').insert({
        id: 1,
        tag: 5,
        article: 2
      });
    }).then(() => {
      return knex('articles_tags').insert({
        id: 2,
        tag: 4,
        article: 2
      });
    }).then(() => {
      return knex('articles_tags').insert({
        id: 3,
        tag: 3,
        article: 2
      });
    }).then(() => {
      return knex('articles_tags').insert({
        id: 4,
        tag: 2,
        article: 1
      });
    }).then(() => {
      return knex('articles_tags').insert({
        id: 5,
        tag: 1,
        article: 1
      });
    }).then(() => {
      return knex.raw("SELECT setval('articles_tags_id_seq', (SELECT MAX(id) FROM articles_tags))");
    });
};
