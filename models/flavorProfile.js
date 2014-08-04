

module.exports = function FlavorProfile(sequelize, DataTypes) {
	var FlavorProfile = sequelize.define('flavor_profile', {
		producerId: {
			type: DataTypes.INTEGER,
			foreignKey: true
		},
		whisky_id: {
			type: DataTypes.INTEGER
			// add foreignKey when adding whiskys
		},
		body: DataTypes.INTEGER,
		sweetness: DataTypes.INTEGER,
		smoky:DataTypes.INTEGER,
		medicinal: DataTypes.INTEGER,
		tobacco: DataTypes.INTEGER,
		honey: DataTypes.INTEGER,
		spicy: DataTypes.INTEGER,
		winey: DataTypes.INTEGER,
		nutty: DataTypes.INTEGER,
		malty: DataTypes.INTEGER,
		fruity: DataTypes.INTEGER,
		floral: DataTypes.INTEGER,
		broad_keyword: DataTypes.STRING,
		broad_keyword2: DataTypes.STRING
	},
	{
		classMethods: {
			associate: function(db) {
				FlavorProfile.belongsTo(db.producer);
			}
		}
	});
	return FlavorProfile;
};