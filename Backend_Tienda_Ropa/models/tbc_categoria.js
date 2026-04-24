'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbc_categoria extends Model {
    static associate(models) {
      tbc_categoria.hasMany(models.tbb_producto, {
        as: 'productos',
        foreignKey: 'id_categoria'
      });
    }
  }

  tbc_categoria.init({
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'tbc_categoria',
    tableName: 'tbc_categorias',
  });

  return tbc_categoria;
};
