const {Model} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
class Connect extends Model {}
  Connect.init({
      ConnectID: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrement: true
      },
      TowerID: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        references: {
          model: 'tower',
          key: 'TowerID'
        }
      },
      CallsID: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
          model: 'calls',
          key: 'CallsID'
        }
      }
    }, {
      sequelize,
      modelName: 'Connect',
      tableName: 'connect',
      freezeTableName: true,
      timestamps: false
    }
  );


  Connect.associate = (db) => {
    Connect.belongsTo(db.Calls, {
      foreignKey: 'CallsID',
      targetKey: 'CallsID'
    });

    Connect.belongsTo(db.Tower, {
      foreignKey: 'TowerID',
      targetKey: 'TowerID'
    });
  };

  return Connect;
}
