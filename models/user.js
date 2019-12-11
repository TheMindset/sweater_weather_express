'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: { msg: 'The email must be valid' }
      },
      // unique: {
      //   args: true,
      //   msg: 'This Email is already use please choose another!'
      // }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },
    api_key: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};