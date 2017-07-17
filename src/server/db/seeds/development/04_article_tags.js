exports.seed = (knex, Promise) => {
  return knex('articles_tags').del() // Deletes ALL existing entries
    .then(() => { // Inserts seed entries one by one in series
      return knex('articles_tags').insert({
        id: 1,
        tag_id: 5,
        article_id: 2
      });
    }).then(() => {
      return knex('articles_tags').insert({
        id: 2,
        tag_id: 4,
        article_id: 2
      });
    }).then(() => {
      return knex('articles_tags').insert({
        id: 3,
        tag_id: 3,
        article_id: 2
      });
    }).then(() => {
      return knex('articles_tags').insert({
        id: 4,
        tag_id: 2,
        article_id: 1
      });
    }).then(() => {
      return knex('articles_tags').insert({
        id: 5,
        tag_id: 1,
        article_id: 1
      });
    }).then(() => {
      return knex.raw("SELECT setval('articles_tags_id_seq', (SELECT MAX(id) FROM articles_tags))");
    });
};
