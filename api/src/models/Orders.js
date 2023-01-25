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
        state: {
            type: DataTypes.ENUM("pending", "sent", "delivered"),
            defaultValue: "pending"
        },
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        },
    }, {
        timestamps: false,
    });
};
