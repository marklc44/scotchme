var express = require("express"),
	expressLayouts = require('express-ejs-layouts'),
  bodyParser = require("body-parser"),
  methodOverride = require('method-override'),
  passport = require("passport"),
  passportLocal = require("passport-local"),
  cookieParser = require("cookie-parser"),
  cookieSession = require("cookie-session"),
  db = require("./models/index"),
  flash = require('connect-flash'),
  app = express();

// Middleware
app.set('view engine', 'ejs');
app.set('layout', 'layout');

app.use(expressLayouts);
app.use(methodOverride());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	var pageTitle = "Scotchme Home";
	res.render('index', {pageTitle: pageTitle});
});

app.get('/signup', function(req, res) {
	res.send('signup form');
});

app.get('/login', function(req, res) {
	res.send('login form');
});

app.listen(3000, function() {
	console.log('SERVER IS RUNNING ON PORT 3000');
});