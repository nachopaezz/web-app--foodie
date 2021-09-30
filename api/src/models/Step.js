const { Model, DataTypes } = require("sequelize");

module.exports = sequelize => {
  class Step extends Model {}
  Step.init(
    {
      number: { type: DataTypes.INTEGER, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
    },
    { sequelize: sequelize, modelName: "Step", timestamps: false }
  );
  Step.beforeCreate(function (step) {
    step.content = step.content.toLowerCase();
    return step;
  });
};
