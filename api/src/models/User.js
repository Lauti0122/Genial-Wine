const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,

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
        birthday: {
            type: DataTypes.STRING,

        },
        photo: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,
    });
};
