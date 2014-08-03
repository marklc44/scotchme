var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  , env       = process.env.NODE_ENV || 'development'
  , config    = require(__dirname + '/../config/config.json')[env]
  , sequelize = new Sequelize(config.database, config.username, config.password, config)
  , db        = {}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

// Create Producers Utility
producers.forEach(function(producer, index) {
  name: producer.name,
  url: producer.url,
  image: producer.image,
  region: producer.region,
  region_map_image: null
});

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


module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db)
