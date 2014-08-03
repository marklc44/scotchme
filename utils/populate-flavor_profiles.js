var db = require('../models/index.js');

// Create Flavor Profiles Utility
profiles.forEach(function(profile, index) {
  db.flavorProfile.create({
    producerId: profile.producerId,
    whiskyId: null,
    body: profile.body,
    sweetness: profile.sweetness,
    smoky: profile.smoky,
    medicinial: profile.medicinal,
    tobacco: profile.tobacco,
    honey: profile.honey,
    spicy: profile.spicy,
    winey: profile.winey,
    nutty: profile.nutty,
    fruity: profile.fruity,
    floral: profile.floral,
    broadKeyword: profile.broad_keyword

  });
});