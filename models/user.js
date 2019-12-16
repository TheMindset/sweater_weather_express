'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      }
    },
    password: DataTypes.STRING,
    api_key: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Location, {
      as: 'locations'
    })
  };
  return User;
};