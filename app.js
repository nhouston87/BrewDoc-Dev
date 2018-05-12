// Configure global constants
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

// Configure main app object
const app = express();

// Load routes
const users = require('./routes/users');
const dash = require('./routes/dash');

// Passport config
require('./config/passport')(passport);

// Configure mongoose to connect to db
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/brewdoc-dev')
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Configure template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Method Override middleware
app.use(methodOverride('_method'));

// Express Session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

// Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

// Flash middleware
app.use(flash());

// Global middleware variables
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Configure main route
app.get('/', (req, res) => {
  res.render('index');
});

// Configure imported routes
app.use('/users', users);
app.use('/dash', dash);

// Configure server listening
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
