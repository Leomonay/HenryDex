const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id_pokemon: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen:{
      type: DataTypes.STRING,
    },
    vida: {
      type: DataTypes.INTEGER,
    },
    fuerza: {
      type: DataTypes.INTEGER,
    },
    defensa: {
      type: DataTypes.INTEGER,
    },
    velocidad: {
      type: DataTypes.INTEGER,
    },
    altura: {
      type: DataTypes.FLOAT,
    },
    peso: {
      type: DataTypes.INTEGER,
    },
  });

};
