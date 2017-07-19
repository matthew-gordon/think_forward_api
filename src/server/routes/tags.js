const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/tags');

// *** GET all tags *** //

router.get('/tags', ctrl.get);

module.exports = router;
