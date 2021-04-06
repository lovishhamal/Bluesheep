const Sequalize = require('sequelize');
const db = require('../');

const Order = db.define('order', {
  id: {
    type: Sequalize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  food_id: {
    type: Sequalize.INTEGER,
  },
  user_id: {
    type: Sequalize.INTEGER,
  },
});

module.exports = Order;
