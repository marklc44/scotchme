module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.createTable('producers', {
    	id: {
    		type: DataTypes.INTEGER,
    		primaryKey: true,
    		autoIncrement: true
    	},
    	createdAt: DataTypes.DATE,
    	updatedAt: DataTypes.DATE,
    	name: DataTypes.STRING,
    	url: DataTypes.STRING,
    	image: DataTypes.STRING(1234),
    	region: DataTypes.STRING,
    	region_map_image: DataTypes.STRING
    }).complete(done);
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.dropTable('producers').complete(done);
  }
}
