const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('wine', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,

        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        region: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM("red", "white", "rose")
        },
        grape_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,

        },
        stock: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        capacity: {
            type: DataTypes.STRING,

        },
        year: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        images: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },

    }, {
        timestamps: false,
    });
};
