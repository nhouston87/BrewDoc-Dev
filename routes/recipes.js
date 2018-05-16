const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

// Load recipe model
require('../models/Recipe');
const Recipe = mongoose.model('recipes');

// Recipe Get Routes
router.get('/', ensureAuthenticated, (req, res) => {
  Recipe.find({user: req.user.id})
    .sort({creation_date:'desc'})
    .then(recipes => {
      res.render('recipes/index', {
        recipes:recipes 
      });
    });
});

router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('recipes/add');
});

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Recipe.findOne({
    _id: req.params.id
  }).then(recipe => {
    if(recipe.user != req.user.id){
      req.flash('error_msg', 'Not Authorized');
      res.redirect('/recipes');
    } else {
      res.render('recipes/edit', {
        recipe:recipe
      });
    }
  });
});

// Recipe Post Routes
router.post('/', ensureAuthenticated, (req, res) => {
  let errors = [];

  if(!req.body.name){
    errors.push({text:'Please add a recipe name'});
  }

  if(!req.body.type){
    errors.push({text:'Please select a recipe type'});
  }

  if(!req.body.size){
    errors.push({text:'Please select a recipe size'});
  }

  if(errors.length > 0){
    res.render('recipes/add', {
      errors: errors,
      name: req.body.name,
      type: req.body.type,
      size: req.body.size,
      notes: req.body.notes
    });
  } else {
    const newRecipe = {
      user: req.user.id,
      name: req.body.name,
      type: req.body.type,
      size: req.body.size,
      notes: req.body.notes
    }
    new Recipe(newRecipe)
    .save()
    .then(recipe => {
      req.flash('success_msg', 'New recipe created');
      res.redirect(`/recipes/edit/${recipe._id}`);
    });
  }
  
});

//Recipe update routes
router.put('/:id', (req, res) => {
  Recipe.findOne({
    _id: req.params.id
  })
  .then(recipe => {
    //new values
    recipe.name = req.body.name;
    recipe.type = req.body.type;
    recipe.size = req.body.size;
    recipe.notes = req.body.notes;

    recipe.save()
    .then(recipe => {
      req.flash('success_msg', 'Recipe Updated');
      res.redirect(`/recipes/edit/${req.params.id}`);
    });
  });
});

// Recipe delete route
router.delete('/:id', (req, res) => {
  Recipe.remove({_id: req.params.id})
      .then(() => {
        req.flash('success_msg', 'Recipe was successfully deleted');
        res.redirect('/recipes');
    });
});

module.exports = router;
