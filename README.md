# Scotch Me

See the demo site at: [scotchme.herokuapp.com](http://scotchme.herokuapp.com).

## What and Why
Scotch Me is an exploration in searching for and visualizing Scotch whiskys by flavor profile built with `node`, `express` and `postgres`.
I wanted to create a playground where newbies and Scotch lovers alike could explore whisky (no 'e' in whisky in Scotland) by flavor profiles without doing an exhaustive text based search.
Scotchme is v 0.1.0 of that lifelong endeavor. ([Brown-liquor.com](http://brown-liquor.com) was v 0.0.9)

## Built With:
* Node
* Express
* Postgres
* Passport
* [Semantics3 API](https://www.semantics3.com/)
* [semantics3-node](https://github.com/Semantics3/semantics3-node)
* NESSIE Scotch Flavor Data

## How
Flavor data for Scotch Me came from the [NESSIE - Network Example Source Supporting Innovative Experimentation](https://www.mathstat.strath.ac.uk/outreach/nessie/index.html), the only credible dataset on Scotch Producer flavor profiles and [Malts.com Flavor Map](http://www.malts.com/index.php/en_us/Choosing-Whisky/A-World-of-Flavour/The-Single-Malt-Whisky-Flavour-Map). Pricing and deal data for individual whiskys is provided by the **Semantics3 shopping API** which has risen to fill the void when Google closed the Google Shopping API last year.

I compiled region, url and image data to round out basic profiles of Scotch producers. Currently 52 of 86 Scotch producers are included in the db.

## Next Steps
* Add remaining Scotch producer data (52 of 86)
* Add individual whisky flavor profiles in addition to producer level flavor profiles
* Allow users to add their own flavor profile data for individual whiskys
* Allow users to add overall ratings for whiskys
* Rethink usability
* Scotch whisky region map with descriptions
* More producer/whisky profile data!

If you're a Scotch lover and you want to work together, hit me up. If you're a bourbon, rye or brandy drinker, I'd love to work on similar-ish projects in those realms, too. Hit me up.

