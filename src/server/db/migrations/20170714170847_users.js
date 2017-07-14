exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.text('username').unique().notNullable();
    table.text('email').unique();
    table.text('bio');
    table.text('password').notNullable();
    table.text('image').defaultTo('https://static.productionready.io/images/smiley-cyrus.jpg');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
