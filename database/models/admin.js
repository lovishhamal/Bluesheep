const Sequalize = require('sequelize');

const db = require('../');

const Admin = db.define('admin', {
  id: {
    type: Sequalize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: Sequalize.STRING,
  },
  email: {
    type: Sequalize.STRING,
  },
  password: {
    type: Sequalize.STRING,
  },
  phone: {
    type: Sequalize.STRING,
  },
  role: {
    type: Sequalize.STRING,
  },
});

module.exports = Admin;
