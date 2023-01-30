const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('review', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    rating: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
  });
};
