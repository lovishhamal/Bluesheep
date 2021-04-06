const Sequalize = require('sequelize');
const db = require('../');

const Notif = db.define('notification', {
  id: {
    type: Sequalize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  title: {
    type: Sequalize.STRING,
  },
  body: {
    type: Sequalize.STRING,
  },
  opened: {
    type: Sequalize.STRING,
  },
  created_at: {
    type: Sequalize.DATE,
  },
  updated_at: {
    type: Sequalize.DATE,
  },
});

module.exports = Notif;
