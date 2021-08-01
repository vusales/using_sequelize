const {Model} = require("sequelize");


module.exports = (sequelize, Sequelize) => {
  class Mobile extends Model {}
  Mobile.init({
      MobileID: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrement: true
      },
      PhoneNumber: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      BrandName: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      Joined: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      Cancelled: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      PlanName: {
        type: Sequelize.STRING(20),
        allowNull: true,
        references: {
          model: 'plan',
          key: 'PlanName'
        }
      },
      PhoneColour: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      CustomerID: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        references: {
          model: 'customer',
          key: 'CustomerID'
        }
      },
      StaffID: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        references: {
          model: 'staff',
          key: 'StaffID'
        }
      }
    }, {
      sequelize,
      modelName: 'Mobile',
      tableName: 'mobile',
      freezeTableName: true,
      timestamps: false
    }
  );


  Mobile.associate = (db) => {
    Mobile.hasMany(db.Calls, {
      foreignKey: 'MobileID'
    });

    Mobile.belongsTo(db.Customer, {
      foreignKey: 'CustomerID',
      targetKey: 'CustomerID'
    });
    
    Mobile.belongsTo(db.Staff, {
      foreignKey: 'StaffID',
      targetKey: 'StaffID'
    });

    Mobile.belongsTo(db.Plan, {
      foreignKey: 'PlanName',
      targetKey: 'PlanName'
    });
  };

  return Mobile;
}
