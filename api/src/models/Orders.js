const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('order', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending"
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    payment_method: {
      type: DataTypes.ENUM("mercado_pago", "paypal")
    }
  }, {
    timestamps: false,
  });
};
