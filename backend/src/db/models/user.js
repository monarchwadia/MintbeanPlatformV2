'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
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
  };

  // instance methods
  Object.assign(User.prototype, {
    toString: function() {
      return this.toJSON();
    },
    toJSON: function() {
      const values = Object.assign({}, this.get());
      delete values.password_hash;
      return values;
    }
  });
  
  return User;
};