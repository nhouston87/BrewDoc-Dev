const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

router.get('/', ensureAuthenticated, (req, res) => {
  res.render('recipes/index');
});

router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('recipes/add');
});

module.exports = router;
