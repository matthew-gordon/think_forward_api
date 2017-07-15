const moment = require('moment');
const jwt = require('jsonwebtoken');

require('dotenv').config();

function encodeToken(user) {
  const secret = process.env.TOKEN_SECRET;
  const payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user.id
  }
  return jwt.sign(payload, secret, {});
}

module.exports = {
  encodeToken
}
