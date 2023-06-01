'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AuthToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  AuthToken.init({
    token: DataTypes.STRING,
    type: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    expired_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'AuthToken',
    tableName: 'auth_tokens',
    underscored: true
  });
  return AuthToken;
};