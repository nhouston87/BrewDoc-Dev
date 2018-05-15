const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

router.get('/', ensureAuthenticated, (req, res) => {
  res.render('batches/index');
});

router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('batches/add');
});

module.exports = router;
