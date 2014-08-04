
module.exports = function Producer(sequelize, DataTypes) {
	var Producer = sequelize.define('producer', {
		name: DataTypes.STRING,
		url: DataTypes.STRING,
		image: DataTypes.STRING(1234),
		region: DataTypes.STRING,
		region_map_image: DataTypes.STRING
	},
	{
		classMethods: {
			// Associations
			associate: function(db) {
				Producer.hasOne(db.flavor_profile);
			}
		}
	});
	return Producer;
}
