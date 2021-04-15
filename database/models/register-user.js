const Sequalize = require('sequelize');

const db = require('../');
const User = db.define('users', {
  id: {
    type: Sequalize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  firstname: {
    type: Sequalize.STRING,
    field: 'Firstname',
  },
  lastname: {
    type: Sequalize.STRING,
    field: 'Lastname',
  },
  email: {
    type: Sequalize.STRING,
    field: 'Email',
  },
  password: {
    type: Sequalize.STRING,
    field: 'Password',
  },
  phoneno: {
    type: Sequalize.STRING,
    field: 'Phone No',
  },
  country: {
    type: Sequalize.STRING,
    field: 'Country',
  },
  city: {
    type: Sequalize.STRING,
    field: 'City',
  },
  citizenidno: {
    type: Sequalize.STRING,
    field: 'CitizenId',
  },
});
module.exports = User;
