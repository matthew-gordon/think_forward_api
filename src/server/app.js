const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const auth = require('./routes/auth');
const articles = require('./routes/articles');
const tags = require('./routes/tags');

require('dotenv').config();

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

// *** cross domain requests *** //
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
};

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', auth);
app.use('/articles', articles);
app.use('/tags', tags);

// app.use('*', (req, res, next) => {
//   res.send('Hmmm... that doesn\'t seem to be here...');
// });

// error handlers

// development error handlers
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handlers
// no stacktrace leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
