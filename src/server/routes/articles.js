const knex = require('../db/knex');
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/articles');
const queries = require('../db/queries/article_queries');


router.param('slug', ctrl.bySlug);

router.get('/articles', ctrl.get);

router.get('/articles/:slug', ctrl.getOne);

router.delete('/articles/:slug', ctrl.del);

module.exports = router;
