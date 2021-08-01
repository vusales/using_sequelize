const {Model} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class Tower extends Model {}
  Tower.init({
      TowerID: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrement: true
      },
      Location: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      Bandwidth: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      MaxConn: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      SignalType: {
        type: Sequelize.STRING(2),
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'Tower',
      tableName: 'tower',
      freezeTableName: true,
      timestamps: false
    }
  );


  Tower.associate = (db) => {
    Tower.belongsToMany(db.Calls, {
      through: db.Connect,
      foreignKey: 'TowerID'
    });
  };

  return Tower;
}
