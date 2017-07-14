exports.seed = (knex, Promise) => {
  return knex('users').del() // Deletes ALL existing entries
    .then(() => { // Inserts seed entries one by one in series
      return knex('users').insert({
        id: 1,
        username: 'chris',
        email: 'chris@email.com',
        password: 'password'
      });
    }).then(() => {
      return knex('users').insert({
        id: 2,
        username: 'ari',
        email: 'ari@email.com',
        password: 'password'
      });
    }).then(() => {
      return knex('users').insert({
        id: 3,
        username: 'matt',
        email: 'matt@email.com',
        password: 'password'
      });
    }).then(() => {
      return knex('users').insert({
        id: 4,
        username: 'liz',
        email: 'liz@email.com',
        password: 'password'
      });
    }).then(() => {
      return knex('users').insert({
        id: 5,
        username: 'laura',
        email: 'laura@email.com',
        password: 'password'
      });
    }).then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
    });
};
