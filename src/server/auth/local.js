const moment = require('moment');
const jwt = require('jsonwebtoken');

function encodeToken(user) {
  const secret = process.env.TOKEN_SECRET;
  const payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: {
      id: user.id
    }
  }
  return jwt.sign(payload, secret, {});
}

function decodeToken(token, callback) {
  const secret = process.env.TOKEN_SECRET;
  const payload = jwt.verify(token, secret);
  const now = moment().unix();
  if(now > payload.exp) callback('Token has expired.');
  else callback(null, payload);
}

module.exports = {
  encodeToken,
  decodeToken
}
