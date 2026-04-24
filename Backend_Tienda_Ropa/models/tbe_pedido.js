'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbe_pedido extends Model {
    static associate(models) {
      tbe_pedido.belongsTo(models.tbc_usuario, {
        as: 'tbc_usuario',
        foreignKey: 'id_usuario',
      });

      tbe_pedido.belongsTo(models.tbb_carrito, {
        as: 'tbb_carrito',
        foreignKey: 'id_carrito',
      });
    }
  }

  tbe_pedido.init({
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_carrito: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'),
      defaultValue: 'pendiente',
      allowNull: false
    },
    metodo_pago: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    direccion_envio: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fecha_pedido: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tbe_pedido',
    tableName: 'tbe_pedidos',
  });

  return tbe_pedido;
};
