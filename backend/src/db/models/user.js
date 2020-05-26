'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    linkedin_id: DataTypes.STRING,
    github_id: DataTypes.STRING,
    twitter_id: DataTypes.STRING,
    stackoverflow_id: DataTypes.STRING
  }, 
  {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Project);
    User.hasMany(models.Vote);
  };

  User.prototype.toString = function() {
    return this.toJSON();
  }

  User.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());
    delete values.password_hash;

    // only show isAdmin if it is true
    // just being more defensive
    if (!values.isAdmin) {
      delete values.isAdmin;
    }

    return values;
  }
  
  return User;
};