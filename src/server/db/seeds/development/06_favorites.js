exports.seed = (knex, Promise) => {
  return knex('favorites').del() // Deletes ALL existing entries
    .then(() => { // Inserts seed entries one by one in series
      return knex('favorites').insert({
        id: 1,
        user: 3,
        article: 1
      });
    }).then(() => {
      return knex('favorites').insert({
        id: 2,
        user: 3,
        article: 2
      });
    }).then(() => {
      return knex('favorites').insert({
        id: 3,
        user: 5,
        article: 1
      });
    }).then(() => {
      return knex('favorites').insert({
        id: 4,
        user: 1,
        article: 3
      });
    }).then(() => {
      return knex('favorites').insert({
        id: 5,
        user: 2,
        article: 3
      })
    }).then(() => {
      return knex('favorites').insert({
        id: 6,
        user: 1,
        article: 3
      })
    }).then(() => {
      return knex('favorites').insert({
        id: 7,
        user: 1,
        article: 4
      })
    }).then(() => {
      return knex('favorites').insert({
        id: 8,
        user: 4,
        article: 5
      })
    }).then(() => {
      return knex('favorites').insert({
        id: 9,
        user: 2,
        article: 4
      })
    }).then(() => {
      return knex('favorites').insert({
        id: 10,
        user: 3,
        article: 5
      })
    }).then(() => {
      return knex.raw("SELECT setval('favorites_id_seq', (SELECT MAX(id) FROM favorites))");
    });
};
