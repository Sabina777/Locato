module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define("Store", {
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    latitude: { type: DataTypes.FLOAT, allowNull: false },
    longitude: { type: DataTypes.FLOAT, allowNull: false },
    category: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    website: { type: DataTypes.STRING },
    opening_hours: { type: DataTypes.JSONB },
  });

  Store.associate = (models) => {
    Store.hasMany(models.Review, { foreignKey: "store_id", onDelete: "CASCADE" });
  };

  return Store;
};
