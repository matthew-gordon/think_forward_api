const knex = require('../db/knex');
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/articles');
const queries = require('../db/queries/article_queries');

// Set :id param to use byId method from controller
router.param('slug', ctrl.bySlug);
//
router.get('/:slug', ctrl.getOne);

// *** GET all articles *** //
router.get('/', (req, res, next) => {
  return queries.getAllArticles()
  .then((articles) => {
    console.log(ctrl.article);
    res.status(200).json({
      status: 'success',
      articles
    });
  })
  .catch((error) => {
    next(error);
  });
});

// // *** GET single article by id *** //
// router.get('/:id', (req, res, next) => {
//   return queries.getSingleArticle(req.params.id)
//   .then((article) => {
//     res.status(200).json({
//       status: 'success',
//       article
//     });
//   });
// });

module.exports = router;
