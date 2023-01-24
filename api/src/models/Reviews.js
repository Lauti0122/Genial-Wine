const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
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
