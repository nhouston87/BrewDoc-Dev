const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('dashboard/user');
});

// Update user


module.exports = router;
