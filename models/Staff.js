const {Model} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class Staff extends Model {}
  Staff.init({
      StaffID: {
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
        type: Sequelize.DATE,
        allowNull: true
      },
      Sex: {
        type: Sequelize.CHAR(1),
        allowNull: true
      },
      Joined: {
        type: Sequelize.DATE,
        allowNull: true
      },
      Resigned: {
        type: Sequelize.DATE,
        allowNull: true
      },
      Address: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      Suburb: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      Postcode: {
        type: Sequelize.STRING(6),
        allowNull: true
      },
      Phone: {
        type: Sequelize.STRING(15),
        allowNull: true
      },
      SupervisorID: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      Commission: {
        type: "DOUBLE",
        allowNull: true
      },
      RatePerHour: {
        type: "DOUBLE",
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'Staff',
      tableName: 'staff',
      freezeTableName: true,
      timestamps: false
    }
  );


  Staff.associate = (db) => {
    Staff.hasMany(db.Mobile, {
      foreignKey: 'StaffID'
    })
  };
  
  return Staff;
}
