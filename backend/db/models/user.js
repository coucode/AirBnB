'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // return an object with only the User instance info safe to save to a JWT
    toSafeObject(){
      const { id, username, email } = this
      return { id, username, email };
    }
    // accepts a password strign and returns true if there is a match to the user's hashedPassword
    // returns false if no match
    validatePassword(password){
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    // accepts an id and returns a user with that id
    static gerCurrentUserById(id){
      return User.scope('currentUser').findByPk(id);
    }
    // accepts an object with credential and password keys
    // searches for one user with the specified credential
    // if found, validate the password using the .validatePassword method
    // if valid, return the user using currentUser scope
    static async login({ credential, password }){
      const {Op} = require ('sequelize')
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)){
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    // accpets an object with a username, email and password
    // has the password using bcryptjs
    // create a user and return the user using the currentUser scope
    static async signup({ username, email, password }){
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username, 
        email, 
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id)
    }

    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (validator.isEmail(value)) {
            throw new Error("Cannot be an email")
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'createdAt', 'updatedAt', 'email']
      }
    },
    scope: {
      currentUser: {
        attributes: { exclude: ['hashedPassword']}
      }, 
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};