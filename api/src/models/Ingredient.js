const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class Ingredient extends Model {}
  Ingredient.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    { sequelize: sequelize, modelName: "Ingredient", timestamps: false }
  );
  Ingredient.beforeCreate(function (ingredient) {
    ingredient.name = ingredient.name.toLowerCase();
    return ingredient;
  });
};
