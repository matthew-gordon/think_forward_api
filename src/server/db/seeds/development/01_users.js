exports.seed = (knex, Promise) => {
  return knex('users').del() // Deletes ALL existing entries
    .then(() => { // Inserts seed entries one by one in series
      return knex('users').insert({
        id: 1,
        username: 'chris',
        bio: 'This is a short bio about me, chris.',
        email: 'chris@email.com',
        password: 'password'
      });
    }).then(() => {
      return knex('users').insert({
        id: 2,
        username: 'ari',
        bio: 'This is a short bio about me, ari.',
        email: 'ari@email.com',
        password: 'password'
      });
    }).then(() => {
      return knex('users').insert({
        id: 3,
        username: 'matt',
        bio: 'This is a short bio about me, matt.',
        email: 'matt@email.com',
        password: 'password'
      });
    }).then(() => {
      return knex('users').insert({
        id: 4,
        username: 'liz',
        bio: 'This is a short bio about me, liz.',
        email: 'liz@email.com',
        password: 'password'
      });
    }).then(() => {
      return knex('users').insert({
        id: 5,
        username: 'laura',
        bio: 'This is a short bio about me, laura.',
        email: 'laura@email.com',
        password: 'password'
      });
    }).then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
    });
};
