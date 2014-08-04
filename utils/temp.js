// temp save of quicksearch query
var searchResults = [];
		db.flavor_profile.findAll({
			where: {
				broad_keyword: req.body.flavor
			}
		}).success(function(profiles) {
			profiles.forEach(function(profile) {
				db.producer.find({
					where: {
						id: profile.dataValues.producer_id
					}
				}).success(function(producer) {
					console.log('Broad search: ', producer.dataValues.name);
					searchResults.push(producer);
				})
			})
		}).success(function() {
			res.render('whiskys/results', {
				pageTitle: 'Results | Scotchme',
				producers: searchResults
			});
		})