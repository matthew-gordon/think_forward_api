const knex = require('../db/knex');
const express = require('express');
const router = express.Router();
const authHelpers = require('../auth/_helpers');
const localAuth = require('../auth/local');
const queries = require('../db/queries');

router.post('/register', (req, res, next)  => {
  return authHelpers.createUser(req)
  .then((response) => {
    return localAuth.encodeToken(response[0]);
  })
  .then((token) => {
    res.status(200).json({
      status: 'success',
      token: token
    });
  })
  .catch((err) => {
    res.status(500).json({
      status: 'error',
      message: 'username already exists'
    });
  });
})

router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  return authHelpers.loginUser(username)
  .then((response) => {
    const bool = authHelpers.comparePass(password, response.password);
    if(bool) return response;
    else return next();
  })
  .then((response) => { return localAuth.encodeToken(response); })
  .then((token) => {
    res.status(200).json({
      status: 'success',
      token: token
    });
  })
  .catch((err) => {
    res.status(500).json({
      status: 'error',
      message: 'Invalid username/password'
    });
  });
});

module.exports = router;
