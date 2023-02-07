const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('shipping', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        city: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        cp: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING,
        },

    }, {
        timestamps: false,
    });
};

