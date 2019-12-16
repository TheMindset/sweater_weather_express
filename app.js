const express = require('express');
const path = require('path');

const cookieParser = require('cookie-parser');

// automated logging of request/response
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/api/v1/users');
const sessionsRouter = require('./routes/api/v1/sessions')
const forecastsRouter = require('./routes/api/v1/forecasts')
const favoritesRouter = require('./routes/api/v1/favorites')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/sessions', sessionsRouter);
app.use('/api/v1/forecasts', forecastsRouter);
app.use('/api/v1/favorites', favoritesRouter);
app.use('/api/v1/favorites', favoritesRouter);

module.exports = app;
