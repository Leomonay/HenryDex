const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('types',{
    id_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
};
