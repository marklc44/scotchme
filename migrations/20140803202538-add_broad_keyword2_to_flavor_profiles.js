module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.addColumn(
    	'flavor_profiles', 
    	'broad_keyword2', 
    	DataTypes.STRING)
    .complete(done);
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.removeColumn('flavor_profiles', 'broad_keyword2')
    	.complete(done);
  }
}
