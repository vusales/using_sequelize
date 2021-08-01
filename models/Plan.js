const {Model} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class Plan extends Model {}
  Plan.init({
      PlanName: {
        type: Sequelize.STRING(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      BreakFee: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      DataAllowance: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        defaultValue: '0'
      },
      MonthlyFee: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      PlanDuration: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      CallCharge: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Plan',
      tableName: 'plan',
      freezeTableName: true,
      timestamps: false
    }
  );


  Plan.associate = (db) => {
    Plan.hasMany(db.Mobile, {
      foreignKey: 'PlanName',
      targetKey: 'PlanName'
    });
  };

  return Plan;
}
