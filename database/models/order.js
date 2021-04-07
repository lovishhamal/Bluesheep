const Sequalize = require('sequelize');
const db = require('../');
const user = require('./register-user');
const food = require('./food');
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

Order.hasMany(user, { foreignKey: 'id', sourceKey: 'user_id' });
Order.hasMany(food, { foreignKey: 'id', sourceKey: 'food_id' });

module.exports = Order;
