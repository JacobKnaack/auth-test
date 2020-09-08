'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./models/users/users-model.js');
const auth = require('./middleware/basic-auth-middleware.js');
const token = require('./middleware/bearer-auth-middleware.js');
const acl = require('./middleware/acl-middleware.js');
const oauth = require('./middleware/oauth/github.js');

authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then((user) => {
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    }).catch(next);
});

authRouter.post('/signin', auth, (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

authRouter.get('/oauth', oauth, (req, res, next) => {
  res.status(200).send(req.token);
});

authRouter.get('/user', token, acl('read'), (req, res, next) => {
  res.status(200).send(req.user);
})

module.exports = authRouter;
