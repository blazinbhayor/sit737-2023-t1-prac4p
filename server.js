// Import necessary libraries
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up session middleware
app.use(session({
  secret: 'your secret key here',
  resave: false,
  saveUninitialized: false
}));

// Set up passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set up flash middleware
app.use(flash());

// Define local strategy for authentication
passport.use(new LocalStrategy(
  function(username, password, done) {
    // Replace this with actual authentication logic, e.g. database lookup
    const user = users.find(u => u.username === username);
    if (!user) {
      return done(null, false, { message: 'Incorrect username or password' });
    }
    bcrypt.compare(password, user.password, function(err, result) {
      if (err) {
        return done(err);
      }
      if (!result) {
        return done(null, false, { message: 'Incorrect username or password' });
      }
      return done(null, user);
    });
  }
));

// Serialize and deserialize user for session management
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // Replace this with actual user lookup logic, e.g. database lookup
  const user = users.find(u => u.id === id);
  if (!user) {
    done(new Error('User not found'));
  } else {
    done(null, user);
  }
});

// Define empty array to hold login information
const users = [];

// Define routes
app.get('/', ensureAuthenticated, function(req, res) {
  res.render('index.ejs', { user: req.user });
});

app.get('/login', function(req, res) {
  res.render('login.ejs', { message: req.flash('error') });
});

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }));

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

app.get('/register', function(req, res) {
  res.render('register.ejs', { message: req.flash('error') });
});

app.post('/register', function(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    req.flash('error', 'Username and password are required');
    res.redirect('/register');
  } else if (users.find(u => u.username === username)) {
    req.flash('error', 'Username already exists');
    res.redirect('/register');
  } else {
    bcrypt.hash(password, 10, function(err, hashedPassword) {
      if (err) {
        throw err;
      }
      const id = users.length + 1;
      users.push({ id, username, password: hashedPassword });
      req.flash('success', 'Registration successful. Please log in.');
      res.redirect('/login');
    });
  }
});


// Middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

// Start server
app.listen(4000, function() {
  console.log
})
