var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(Number(process.env.SALT_WORK_FACTOR));
var passport = require('passport');
var passportLocal = require('passport-local');

module.exports = function User(sequelize, DataTypes) {
	var User = sequelize.define('user', {
		email: {
			type: DataTypes.STRING,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true
			}
		},
		date_of_birth: {
			type: DataTypes.DATE,
			validate: {
				notEmpty: true
			}
		},
	},
	{
		classMethods: {
			// add associations at top
			associate: function(db) {
				User.hasMany(db.producer);
			},
			// authorization and authentication
			encryptPass: function(password) {
				return bcrypt.hashSync(password, salt);
			},
			comparePass: function(userpass, dbpass) {
				return bcrypt.compareSync(userpass, dbpass);
			},
			compareDob: function(dob) {
				var t21Yrs = 662256000000;
				if(dob > Date.now() - t21Yrs) {
					return false;
				}
				return true;
			},
			createNewUser: function(email, password, dob, err, success) {
				if(password.length < 6) {
					err({message: "Password should be more than 6 characters."});
				} else {
					User.create({
						email: email,
						password: this.encryptPass(password),
						date_of_birth: dob
					}).error(function(error) {
						console.log(error);
						if(error.email) {
							err({message: "Please enter a valid email address."});
						}
						else {
							err({message: "An account with this email already exists.", email: email});
						}
						if(error.date_of_birth) {
							if(compareDob(dob) !== true) {
								err({message: "Sorry, you are not old enough to use this site."});
							} else {
								err({message: "Date of birth must be entered."})
							}
						}
					}).success(function(user) {
						success({message: 'Account created! Please login now.'});
					})
				}
			} // end createNewUser

		}
	} // close classMethods outer
	); // close define User

	//begin passport
	passport.use(new passportLocal.Strategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},

	function(req, email, password, done) {
		console.log("About to find user for login");
		User.find({
			where: {
				email: email
			}
		})
		.done(function(error, user) {
			// console.log('Found user on login: ', user);
			if(error) {
				console.log(error);
				return done(err, req.flash('loginMessage', 'Oops! Something went wrong'));
			}
			if(user === null) {
				return done(null, false, req.flash('loginMessage', 'Email does not exist.'));
			}
			if((User.comparePass(password, user.password)) !== true) {
				return done(null, false, req.flash('loginMessage', 'Invalid password'));
			}
			done(null, user);
		}); // end .done
	}
	)); // end passport
	return User;
} // close User function











