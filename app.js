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
  morgan = require("morgan"),
  sortObj = require('./utils/utils.js'),
  app = express();

// API Requester
var sem3request = require('./utils/sem3-request.js');

// Middleware
app.set('view engine', 'ejs');
app.set('layout', 'layout');

app.use(morgan('dev'));
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
	}).done(function(error, user) {
		done(null, user);
	});
});

// -- More Utils -- //
// move to another file before committing
var exclude = function(flavor) {
		var exclusions = ['id', 'producerId', 'whisky_id', 'broad_keyword', 'broad_keyword2', 'updatedAt','createdAt'];
		 return exclusions.indexOf(flavor) !== -1;
};

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
		var pageTitle = 'Find Scotch | Scotchme';
		var auth = req.isAuthenticated();
		db.producer.findAll().success(function(producers) {
			// run user favorites query
			res.render('whiskys/home', {
				pageTitle: pageTitle,
				producers: producers,
				isAuthenticated: auth
			});
		});
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
		res.render('login', {pageTitle: pageTitle, message: req.flash('loginMessage')});
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
	if (req.isAuthenticated) {
		auth = true;
	} else {
		auth = false;
	}
	var pageTitle = 'Find Scotch | Scotchme';
	db.producer.findAll().success(function(producers) {
		res.render('search', {
			pageTitle: pageTitle,
			producers: producers,
			isAuthenticated: auth
		});
	});
});

app.post('/search', function(req, res) {
	if (req.isAuthenticated) {
		auth = true;
	} else {
		auth = false;
	}

	var searchQuery;
	// proucer query
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
			// console.log('Broad search: ', profiles);
			// var priceData = [];
			// profiles.forEach(function(profile) {
			// 	profile.producer.getStartingPrice(function() {
			// 			priceData.push({price: price, name: brand})
			// 		});
				res.render('whiskys/results', {
					pageTitle: 'Search Results | Scotchme',
					profiles: profiles,
					query: searchQuery,
					isAuthenticated: auth
					// priceData: priceData
				});
			// });

		});
	} else {
		// deep query
		searchQuery = req.body;
		var params = {};
		for( var key in req.body) {
			if(req.body[key] !== '' && key !== 'searchType') {
				// here if req.body val = 5, change to 4
				// remove this hack if data changes
				if(req.body[key] === '5') {
					params[key] = 4;
					console.log(req.body[key]);
				} else {
					params[key] = parseInt(req.body[key]);
				}
			}
		}
		console.log("NON EMPTY SEARCH PARAMS: ", params);
		db.flavor_profile.findAll({
			where:  params,
			include: [db.producer]
		}).success(function(profiles) {
			res.render('whiskys/results', {
				pageTitle: 'Search Results | Scotchme',
				profiles: profiles,
				query: searchQuery,
				isAuthenticated: auth
			});
		});
	}

});

app.get('/results', function(req, res) {
	var pageTitle = 'Scotch Results | Scotchme';
	res.render('whiskys/results', {pageTitle: pageTitle});
});

app.get('/producers/:id', function(req, res) {
	var pageTitle = 'Whisky | Scotchme';
	var id = req.params.id;
	var auth = false;

	if(req.isAuthenticated) {
		auth = true;
	}
	
	db.producer.find({where: {id: id}, include:[db.flavor_profile]})
		.success(function(producer) {
			var brand = producer.dataValues.name;
			sem3request(brand, function(products) {
				res.render('whiskys/show', {
					pageTitle: producer.dataValues.name + ' | Scotchme',
					data: JSON.parse(products),
					producer: producer,
					isAuthenticated: auth,
					exclude: exclude,
					flavors: sortObj(producer.dataValues.flavorProfile.dataValues)
				});
				console.log('Sem3 data returned');
			});
		});
});

app.post('/producers/favorites', function(req, res) {
	// grab fav info
	// prodId is still undefined
	var prodId = req.body.id;
	console.log("Producer Id in favs: ", prodId);
	var userId = req.user.id;

		db.producer.find({
			where: {
				id: prodId
			}
		}).success(function(producer) {
			req.user.addProducer(producer)
				.success(function() {
					console.log('TASK ADDED');
					res.redirect('/producers/' + prodId);
				})
		})

});



app.get('*', function(req, res) {
	var pageTitle = "404 | Scotchme";
	res.render('404', {pageTitle: pageTitle});
});


app.listen(process.env.PORT || 3000, function() {
	console.log('SERVER IS RUNNING');
});