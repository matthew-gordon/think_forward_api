const knex = require('../db/knex');
const express = require('express');
const router = express.Router();
const queries = require('../db/queries/article_queries');

// *** GET all articles *** //

router.get('/', (req, res, next) => {
  return queries.getAllArticles()
  .then((articles) => {
    res.status(200).json({
      status: 'success',
      articles
    });
  })
  .catch((error) => {
    next(error);
  });
});

module.exports = router;
