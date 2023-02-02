const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('orderItem', {
    id: {
      type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    timestamps: false,
  });
};
