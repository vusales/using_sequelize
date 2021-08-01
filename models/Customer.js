const {Model} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class Customer extends Model {}
  Customer.init({
      CustomerID: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrement: true
      },
      Surname: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      Given: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      DOB: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      Sex: {
        type: Sequelize.CHAR(1),
        allowNull: true
      },
      PhoneHome: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      PhoneWork: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      PhoneFax: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      Address: {
        type: Sequelize.STRING(80),
        allowNull: true
      },
      Suburb: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      State: {
        type: Sequelize.STRING(3),
        allowNull: true
      },
      Postcode: {
        type: Sequelize.STRING(5),
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'Customer',
      tableName: 'customer',
      freezeTableName: true,
      timestamps: false
    }
  );


  Customer.associate = (db) => {
    Customer.hasMany(db.Mobile, {
      foreignKey: 'CustomerID'
    })
  };
  
  return Customer;
}
