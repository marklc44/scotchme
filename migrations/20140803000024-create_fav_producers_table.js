module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.createTable('fav_producers', {
    	id: {
    		type: DataTypes.INTEGER,
    		primaryKey: true,
    		autoIncrement: true
    	},
    	createdAt: DataTypes.DATE,
    	updatedAt: DataTypes.DATE,
    	user_id: {
    		type: DataTypes.INTEGER,
    		foreignKey: true
    	},
    	producer_id: {
    		type: DataTypes.INTEGER,
    		foreignKey: true
    	}
    }).complete(done);
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.dropTable('fav_producers').complete(done);
  }
}
