'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    city: DataTypes.STRING
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
    Location.belongsTo(models.User, {
      foreignKey: 'UserId',
      as: 'user'
    })
  };
  return Location;
};