exports.seed = (knex, Promise) => {
  return knex('followers').del() // Deletes ALL existing entries
    .then(() => { // Inserts seed entries one by one in series
      return knex('followers').insert({
        id: 1,
        user: 3,
        follower: 2
      });
    }).then(() => {
      return knex('followers').insert({
        id: 2,
        user: 3,
        follower: 1
      });
    }).then(() => {
      return knex('followers').insert({
        id: 3,
        user: 5,
        follower: 3
      });
    }).then(() => {
      return knex('followers').insert({
        id: 4,
        user: 1,
        follower: 4
      });
    }).then(() => {
      return knex('followers').insert({
        id: 5,
        user: 3,
        follower: 5
      });
    }).then(() => {
      return knex.raw("SELECT setval('followers_id_seq', (SELECT MAX(id) FROM followers))");
    });
};
