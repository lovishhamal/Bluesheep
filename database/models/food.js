const Sequalize = require('sequelize');
const db = require('../');
const Order = require('./order');

const Food = db.define('food', {
  id: {
    type: Sequalize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: Sequalize.STRING,
  },
  price: {
    type: Sequalize.INTEGER,
  },
  description: {
    type: Sequalize.STRING,
  },
  images: {
    type: Sequalize.ARRAY(Sequalize.STRING),
  },
});

Food.hasMany(Order, { foreignKey: 'food_id', sourceKey: 'id' });

module.exports = Food;
