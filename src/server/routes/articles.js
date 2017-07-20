const knex = require('../db/knex');
const express = require('express');
const router = express.Router();
const ctrl_article = require('../controllers/articles');
const ctrl_comment = require('../controllers/comments');
const queries = require('../db/queries/article_queries');


router.param('slug', ctrl_article.bySlug);
// router.param('comment', ctrl_comment.byComment);

router.get('/articles', ctrl_article.get);

router.get('/articles/:slug', ctrl_article.getOne);

router.delete('/articles/:slug', ctrl_article.del);

router.get('/articles/:slug/comments', ctrl_comment.get);
router.post('/articles/:slug/comments', ctrl_comment.post);

module.exports = router;
