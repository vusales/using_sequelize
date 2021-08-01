const {Model} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class Calls extends Model {}
  Calls.init({
      CallsID: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      MobileID: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        references: {
          model: 'mobile',
          key: 'MobileID'
        }
      },
      CalledNumber: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      CallDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      CallTime: {
        type: Sequelize.TIME,
        allowNull: true
      },
      CallDuration: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      DataUsage: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'Calls',
      tableName: 'calls',
      freezeTableName: true,
      timestamps: false
    }
  );


  Calls.associate = (db) => {
    Calls.belongsTo(db.Mobile, {
      foreignKey: 'MobileID',
      targetKey: 'MobileID'
    });

    Calls.belongsToMany(db.Tower, {
      through: db.Connect,
      foreignKey: 'CallsID'
    });
  };

  return Calls;
}
