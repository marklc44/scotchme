# Scotch Me

See the demo site at: (scotchme.herokuapp.com)[http://scotchme.herokuapp.com].

## What and Why
Scotch Me is an exploration in searching for and visualizing Scotch whiskys by flavor profile built with `node`, `express` and `postgres`.
The question in an NYC penthouse a decade ago flummoxed me: Bourbon or Scotch? Um, I thought, which one is Jack Daniels? But I said: you choose. What I got was an Ardbeg Uigadail. I never knew whiskey could taste like that! The peat smacked me in the face, and then other flavors crept in behind it. My head was spinning after one sip, and I quickly set to researching.
Blogs and online communities centered around brown liquor have been springing up recently, and there are plenty of places you can go to look up Scotch, look up reviews, and read tons of information. But most resources are highly text based, magazine style, and you have to know what you're looking for if you have any hope of finding it. 
I wanted to create a playground where newbies and Scotch lovers alike could explore whisky (no 'e' in whisky in Scotland) by flavor profiles without doing an exhaustive text based search.
Scotchme is v 0.2.0 of that lifelong endeavor. ([Brown-liquor.com](http://brown-liquor.com) was v 0.0.9)

## How
Flavor data for Scotch Me came from the [NESSIE - Network Example Source Supporting Innovative Experimentation](https://www.mathstat.strath.ac.uk/outreach/nessie/index.html), the only credible dataset on Scotch Producer flavor profiles and [Malts.com Flavor Map](http://www.malts.com/index.php/en_us/Choosing-Whisky/A-World-of-Flavour/The-Single-Malt-Whisky-Flavour-Map). Pricing and deal data for individual whiskys is provided by the Semantics3 shopping API which has risen to fill the void when Google shut down the Google Shopping API last year.

I compiled region, url and image data to round out basic profiles of Scotch producers. Currently 52 of 86 Scotch producers are included in the db. (The rest are but a json file away.) 


## Next Steps
- Add remaining Scotch producer data
- Add individual whisky flavor profiles in addition to producer level flavor profiles
- Allow users to add their own flavor profile data for individual whiskys
- Allow users to add overall ratings for whiskys
- Rethink usability
- Scotch whisky region map with descriptions
- More producer/whisky profile data!

If you're a Scotch lover and you want to work together, hit me up. If you're a bourbon, rye or brandy drinker, I'd love to work on similar-ish projects in those realms, too. Hit me up. If you're a tequila lover, more power to you, but that's out of my scope. If you're a vodka drinker, the flavor profile is: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.
