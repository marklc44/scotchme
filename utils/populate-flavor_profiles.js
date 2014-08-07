var db = require('../models/index.js');
var data = require('./production-flavor_profile-data.js');

//console.log(data);

// Create Flavor Profiles Utility
data.forEach(function(profile, index) {
  db.flavor_profile.create({
    producerId: profile[0],
    body: profile[1],
    sweetness: profile[2],
    smoky: profile[3],
    medicinal: profile[4],
    tobacco: profile[5],
    honey: profile[6],
    spicy: profile[7],
    winey: profile[8],
    nutty: profile[9],
    malty: profile[10],
    fruity: profile[11],
    floral: profile[12]

  });
});