module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.renameColumn(
    	'flavor_profiles',
    	'producer_id',
    	'producerId'
    	).complete(done);
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.renameColumn(
    	'flavor_profiles',
    	'producerId',
    	'producer_id'
    	).complete(done);
  }
}
