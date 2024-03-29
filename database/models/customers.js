const Sequalize = require('sequelize');
const db = require('../');
const users = require('./register-user');
const Customers = db.define('customers', {
  id: {
    type: Sequalize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  bed: {
    type: Sequalize.INTEGER,
    field: 'Bed',
  },
  capacity: {
    type: Sequalize.INTEGER,
    field: 'Capacity',
  },
  roomid: {
    type: Sequalize.INTEGER,
    field: 'RoomId',
  },
  roomname: {
    type: Sequalize.INTEGER,
    field: 'RoomName',
  },
  roomno: {
    type: Sequalize.INTEGER,
    field: 'RoomNo',
  },
  user_id: {
    type: Sequalize.INTEGER,
    field: 'UserId',
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
Customers.hasOne(users, { sourceKey: 'user_id', foreignKey: 'id' });
module.exports = Customers;
