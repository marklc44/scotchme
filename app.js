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

// API Requester
var sem3request = require('./public/js/sem3-request.js');

// Middleware
app.set('view engine', 'ejs');
app.set('layout', 'layout');

app.use(expressLayouts);
app.use(methodOverride());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

// Session Cookies
app.use(cookieSession({
	secret: 'secretKey',
	name: 'session with cookie data',
	maxage: 604800000
}));

// Prep for Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Passport Serialize
passport.serializeUser(function(user, done) {
	console.log('SERIALIZED JUST RAN');
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	console.log('DESERIALIZE JUST RAN');
	db.user.find({
		where: {
			id: id
		}
	}).done(function() {
		done(error, user);
	});
});

app.get('/', function(req, res) {
	var pageTitle = "Scotchme Home";
	if(!req.user) {
		res.render('index', {pageTitle: pageTitle});
	} else {
		res.redirect('/home');
	}
});

app.get('/home', function(req, res) {
	var pageTitle = 'Scotchme';
	if(!req.user) {
		res.redirect('/');
	} else {
		res.render('whiskys/home', {pageTitle: pageTitle});
	}
});

app.get('/signup', function(req, res) {
	var pageTitle = "Scotchme Signup";
	if(!req.user) {
		res.render('signup', {pageTitle: pageTitle});
	} else {
		res.redirect('/home')
	}
});

app.post('/signup', function(req, res) {
	db.user.createNewUser(req.body.email, req.body.password, req.body.dob,
		function(err) {
			res.render('signup', {message: err.message, email: req.body.email});
		},
		function(success) {
			res.redirect('/login');
		});
});

app.get('/login', function(req, res) {
	var pageTitle = 'Log into Scotchme';
	if(!req.user) {
		res.render('login', {pageTitle: pageTitle});
	} else {
		res.redirect('/home');
	}
	
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/search', function(req, res) {
	var pageTitle = 'Find Scotch | Scotchme';
	db.producer.findAll().success(function(producers) {
		res.render('search', {
			pageTitle: pageTitle,
			producers: producers
		});
	});
});

app.post('/search', function(req, res) {
	var searchQuery;
	if (req.body.searchType === 'producerSearch') {
		var id = req.body.producerId;
		db.producer.find({where: {id: id}})
			.success(function(producer) {
				res.redirect('/producers/' + producer.dataValues.id);
			});
	} else if (req.body.searchType === 'quickSearch') {
		// run broad query
		searchQuery = req.body.flavor;
		db.flavor_profile.findAll({
			where: {
				broad_keyword: req.body.flavor
			},
			include: [db.producer]
		}).success(function(profiles) {
			console.log('Broad search: ', profiles);
			res.render('whiskys/results', {
				pageTitle: 'Search Results | Scotchme',
				profiles: profiles,
				query: searchQuery
			});
		});
	} else {
		// run deep query
	}

	
});

app.get('/results', function(req, res) {
	var pageTitle = 'Scotch Results | Scotchme';
	res.render('whiskys/results', {pageTitle: pageTitle});
});

app.get('/producers/:id', function(req, res) {
	var pageTitle = 'Whisky | Scotchme';
	var id = req.params.id;
	// Get the brand from the db to pass to sem3request
	db.producer.find({where: {id: id}})
		.success(function(producer) {
			var brand = producer.dataValues.name;
			console.log('Show : ', brand);
			sem3request(brand, function(products) {
				res.render('whiskys/show', {
					pageTitle: producer.dataValues.name + ' | Scotchme', 
					data: JSON.parse(products),
					producer: producer
				});
				console.log('Sem3 data returned');
			});
		});
});


app.get('*', function(req, res) {
	var pageTitle = "404 | Scotchme";
	res.render('404', {pageTitle: pageTitle});
});


app.listen(3000, function() {
	console.log('SERVER IS RUNNING ON PORT 3000');
});