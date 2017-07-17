const express = require('express');
const router = express.Router();

const queries = require('../db/queries/tag_queries');

// *** GET all tags *** //

router.get('/', (req, res, next) => {
  return queries.getAllTags()
  .then((tags) => {
    res.status(200).json({
      status: 'success',
      tags
    });
  })
  .catch((err) => {
    next(err);
  });
});

// *** GET all tags for an article *** //
router.get('/article/:id', (req, res, next) => {
  return queries.getArticleTags(req.params.id)
  .then((tags) => {
    res.status(200).json({
      status: 'success',
      tags
    });
  })
  .catch((err) => {
    next(err)
  });
});

module.exports = router;
