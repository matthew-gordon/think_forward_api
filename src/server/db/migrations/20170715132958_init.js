exports.up = function(knex, Promise) {
  return knex.schema

    .createTable('users', (table) => {
      table.increments();
      table.text('username').unique().notNullable();
      table.text('email').unique();
      table.text('bio');
      table.text('password').notNullable();
      table.text('image').defaultTo('https://static.productionready.io/images/smiley-cyrus.jpg');
      table.timestamps(true, true);
    })

    .createTable('articles', (table) => {
      table.increments('id');
      table.string('slug').unique().notNullable();
      table.string('title').notNullable();
      table.text('body').notNullable();
      table.string('description').notNullable();
      table.integer('favorites_count').notNullable().defaultTo(0);
      table.integer('author').notNullable().references('users.id')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    })

    .createTable('comments', function (table) {
      table.increments();
      table.text('body').notNullable()
      table.integer('author').notNullable().references('users.id')
        .onDelete('CASCADE')
      table.integer('article').notNullable().references('articles.id')
        .onDelete('CASCADE')
      table.timestamps(true, true)
    })

    .createTable('favorites', (table) => {
      table.increments();
      table.integer('user').notNullable().references('users.id')
        .onDelete('CASCADE')
      table.integer('article').notNullable().references('articles.id')
        .onDelete('CASCADE');
      table.timestamps(true, true)
    })

    .createTable('followers', (table) => {
      table.increments();
      table.integer('user').notNullable().references('users.id')
        .onDelete('CASCADE');
      table.integer('follower').notNullable().references('users.id')
        .onDelete('CASCADE')
      table.unique(['user', 'follower'])
      table.timestamps(true, true)
    })

    .createTable('tags', (table) => {
      table.increments();
      table.string('name').unique().notNullable();
      table.timestamps(true, true);
    })

    .createTable('articles_tags', (table) => {
      table.increments();
      table.integer('article').notNullable().references('articles.id')
        .onDelete('CASCADE');
      table.integer('tag').notNullable().references('tags.id')
        .onDelete('CASCADE');
      table.unique(['tag', 'article']);
      table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('articles')
    .dropTableIfExists('comments')
    .dropTableIfExists('favorites')
    .dropTableIfExists('followers')
    .dropTableIfExists('tags')
    .dropTableIfExists('articles_tags');
};
