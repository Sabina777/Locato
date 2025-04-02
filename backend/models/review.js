module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    store_id: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.TEXT },
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, { foreignKey: "user_id", onDelete: "CASCADE" });
    Review.belongsTo(models.Store, { foreignKey: "store_id", onDelete: "CASCADE" });
  };

  return Review;
};
