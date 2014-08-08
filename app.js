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
app.use(methodOverride('_method'));
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

// Get root page
app.get('/', function(req, res) {
	var pageTitle = "Scotchme Home";
	if(!req.user) {
		res.render('index', {pageTitle: pageTitle});
	} else {
		res.redirect('/home');
	}
});

// Get user home page
app.get('/home', function(req, res) {
	var pageTitle = 'Scotchme';

	if(!req.user) {
		res.redirect('/');
	} else {
		var auth = req.isAuthenticated();
		db.producer.findAll().success(function(producers) {
			// user favorites query
			req.user.getProducers().success(function(favs) {
				res.render('whiskys/home', {
					pageTitle: pageTitle,
					producers: producers,
					isAuthenticated: auth,
					favs: favs
				});
			});
		});
	}
});

// Get signup form
app.get('/signup', function(req, res) {
	var pageTitle = "Scotchme Signup";
	if(!req.user) {
		res.render('signup', {pageTitle: pageTitle});
	} else {
		res.redirect('/home')
	}
});

// Post to signup form
app.post('/signup', function(req, res) {
	db.user.createNewUser(req.body.email, req.body.password, req.body.dob,
		function(err) {
			res.render('signup', {pageTitle: "Scotchme Signup", message: err.message, email: req.body.email});
		},
		function(success) {
			res.redirect('/login');
		});
});

// Get Login form
app.get('/login', function(req, res) {
	var pageTitle = 'Log into Scotchme';
	if(!req.user) {
		console.log('Error message', req.flash('loginMessage'))
		res.render('login', {pageTitle: pageTitle, message: req.flash('loginMessage')});
	} else {
		res.redirect('/home');
	}
	
});

// Post to Login form
app.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true

}));

// Log out
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// Get generic Search form
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

// Post search query params and run query
app.get('/results', function(req, res) {
	if (req.isAuthenticated) {
		auth = true;
	} else {
		auth = false;
	}

	var searchQuery;
	// producer query
	if (req.query.searchType === 'producerSearch') {
		var id = req.query.producerId;
		db.producer.find({where: {id: id}})
			.success(function(producer) {
				res.redirect('/producers/' + producer.dataValues.id);
			});
	} else if (req.query.searchType === 'quickSearch') {
		// run broad query
		searchQuery = req.query.flavor;
		db.flavor_profile.findAll({
			where: {
				broad_keyword: req.query.flavor
			},
			include: [db.producer]
		}).success(function(profiles) {
			res.render('whiskys/results', {
				pageTitle: 'Search Results | Scotchme',
				profiles: profiles,
				query: searchQuery,
				isAuthenticated: auth
			});
		});
	} else {
		// deep query
		searchQuery = req.query;
		var params = {};
		var nums = ['0','1','2','3','4','5'];
		for( var key in req.query) {
			if(req.query[key] !== '' && key !== 'searchType'  && nums.indexOf(req.query[key]) > -1) {
				// here if req.query val = 5, change to 4
				// remove this hack if data changes
				if(req.query[key] === '5') {
					params[key] = 4;

				} else {
					params[key] = parseInt(req.query[key]);
				}
			}
		}
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





app.delete('/producers/favorites', function(req, res) {
	var prodId = req.body.id;
	console.log("user.id", req.user.id);
		db.producer.find({
			where: {
				id: prodId
			}
		}).success(function(producer) {
			console.log('user to remove producer from: ',req.user)
			console.log('producer to delete: ', producer)
			db.user.find({where:{id: req.user.id}})
				.success(function(user){
					user.removeProducer(producer).success(function(taco) {
						console.log('from remove ', taco);
						res.redirect('/producers/' + prodId);
					});
				})
			
		});
});

app.post('/producers/favorites', function(req, res) {
	var prodId = req.body.id;
	var userId = req.user.id;

	db.producer.find({
		where: {
			id: prodId
		}
	}).success(function(producer) {
		db.user.find({where: {id: req.user.id}}).success(function(user) {
			user.addProducer(producer)
			.success(function() {
				res.redirect('/producers/' + prodId);
			});
		})
		
	});
});

app.get('/producers/:id', function(req, res) {
	var searchPage = req.headers.referer;
	var pageTitle = 'Whisky | Scotchme';
	var id = req.params.id;
	var auth = req.isAuthenticated();
	var isFav = false;
	
	db.producer.find({where: {id: id}, include:[db.flavor_profile]})
		.success(function(producer) {
			db.user.find({where: {id: req.user.id}})
				.success(function(user) {
					req.user.hasProducer(producer).success(function(result) {

				isFav = result;
				//console.log(result);
				console.log('IS FAV: ', isFav);
			
				var brand = producer.dataValues.name;
				console.log(brand)
				sem3request(brand, function(products) {
					//console.log("RESPONSE FROM SEM3: ", products)
					res.render('whiskys/show', {
						pageTitle: producer.dataValues.name + ' | Scotchme',
						previous: searchPage,
						data: JSON.parse(products),
						producer: producer,
						isAuthenticated: auth,
						isFav: isFav,
						flavors: sortObj(producer.dataValues.flavorProfile.dataValues)
					});
				});
				});
			
		});
	});
});

app.get('*', function(req, res) {
	var pageTitle = "404 | Scotchme";
	res.render('404', {pageTitle: pageTitle});
});


app.listen(process.env.PORT || 3000, function() {
	console.log('SERVER IS RUNNING');
});