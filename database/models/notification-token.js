const Sequalize = require('sequelize');
const db = require('../');

const Token = db.define('token', {
  id: {
    type: Sequalize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  notification: {
    type: Sequalize.STRING,
    field: 'Notification',
  },
});

module.exports = Token;
