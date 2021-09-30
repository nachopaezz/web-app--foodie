const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class Diet extends Model {}
  Diet.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    { sequelize: sequelize, modelName: "Diet", timestamps: false }
  );
  Diet.beforeCreate(function (diet) {
    diet.name = diet.name.toLowerCase();
    return diet;
  });
};
