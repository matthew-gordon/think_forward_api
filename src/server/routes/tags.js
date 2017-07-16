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

module.exports = router;
