const knex = require('../db/knex');
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/articles');
const queries = require('../db/queries/article_queries');


router.param('slug', ctrl.bySlug);

router.get('/', ctrl.get);

router.get('/:slug', ctrl.getOne);

// *** GET all articles *** //
// router.get('/', (req, res, next) => {
//   return queries.getAllArticles()
//   .then((articles) => {
//     console.log(ctrl.article);
//     res.status(200).json({
//       status: 'success',
//       articles
//     });
//   })
//   .catch((error) => {
//     next(error);
//   });
// });

module.exports = router;
