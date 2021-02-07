'use strict';
const{ hassPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize
  class User extends Model {}

  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        isEmail: true,
        notNull: true,
        notEmpty: true, 
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull: true,
        notEmpty: true, 
      }
    }
  }, {
    sequelize,
    timestamps : false,
    hooks: {
      beforeCreate: (user, opt) => {
        user.password = hassPassword(user.password)
      }
    }
  })

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};