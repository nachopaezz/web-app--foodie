const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class RecipeIngredient extends Model {}
  RecipeIngredient.init(
    {
      amount: { type: DataTypes.INTEGER, allowNull: false },
      unit: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize: sequelize, modelName: "RecipeIngredient", timestamps: false }
  );
  RecipeIngredient.beforeCreate(function (rel) {
    rel.unti = rel.unit.toLowerCase();
    return rel;
  });
};
