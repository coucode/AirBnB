'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.User, { foreignKey: 'userId' })
      Image.belongsTo(models.Spot, { foreignKey: 'spotId' })
      Image.belongsTo(models.Review, { foreignKey: 'reviewId' })
    }
  }
  Image.init({
    url: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    previewImage: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    spotId: {
      type: DataTypes.INTEGER,
    },
    reviewId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};