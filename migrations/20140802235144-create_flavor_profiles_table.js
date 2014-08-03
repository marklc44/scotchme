module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.createTable('flavor_profiles', {
    	id: {
    		type: DataTypes.INTEGER,
    		primaryKey: true,
    		autoIncrement: true
    	},
    	createdAt: DataTypes.DATE,
    	updatedAt: DataTypes.DATE,
    	producer_id: {
    		type: DataTypes.INTEGER,
    		foreignKey: true
    	},
    	whisky_id: {
    		type: DataTypes.INTEGER,
    		foreignKey: true
    	},
    	body: DataTypes.INTEGER,
    	sweetness: DataTypes.INTEGER,
    	smoky: DataTypes.INTEGER,
    	medicinal: DataTypes.INTEGER,
    	tobacco: DataTypes.INTEGER,
    	honey: DataTypes.INTEGER,
    	spicy: DataTypes.INTEGER,
    	winey: DataTypes.INTEGER,
    	nutty: DataTypes.INTEGER,
    	malty: DataTypes.INTEGER,
    	fruity: DataTypes.INTEGER,
    	floral: DataTypes.INTEGER,
        broad_keyword: DataTypes.STRING

    }).complete(done);
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.dropTable('flavor_profiles').complete(done);
  }
}
