exports.seed = (knex, Promise) => {
  return knex('tags').del() // Deletes ALL existing entries
    .then(() => { // Inserts seed entries one by one in series
      return knex('tags').insert({
        id: 1,
        name: 'angular'
      });
    }).then(() => {
      return knex('tags').insert({
        id: 2,
        name: 'react'
      });
    }).then(() => {
      return knex('tags').insert({
        id: 3,
        name: 'redux'
      });
    }).then(() => {
      return knex('tags').insert({
        id: 4,
        name: 'react-router'
      });
    }).then(() => {
      return knex('tags').insert({
        id: 5,
        name: 'postgresql'
      });
    }).then(() => {
      return knex.raw("SELECT setval('tags_id_seq', (SELECT MAX(id) FROM tags))");
    });
};
