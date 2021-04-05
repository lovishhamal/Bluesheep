const Sequalize = require('sequelize');
const db = require('../');

const Customers = db.define('customers', {
  id: {
    type: Sequalize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: Sequalize.STRING,
    field: 'Name',
  },
  email: {
    type: Sequalize.STRING,
    field: 'Email',
  },
  address: {
    type: Sequalize.STRING,
    field: 'Address',
  },
  idno: { type: Sequalize.INTEGER, field: 'IdNo' },
  roomname: {
    type: Sequalize.INTEGER,
    field: 'RoomName',
  },
  roomno: {
    type: Sequalize.INTEGER,
    field: 'RoomNo',
  },
  start_date: {
    type: Sequalize.DATE,
    field: 'StartDate',
  },
  end_date: {
    type: Sequalize.DATE,
    field: 'EndDate',
  },
});

module.exports = Customers;
