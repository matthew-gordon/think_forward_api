const knex = require('../db/knex');

async function get (req, res, next) {
  const tags = await knex('tags').pluck('name');

  res.locals.tags = tags;
  await next();
}

module.exports = {
  get
}
