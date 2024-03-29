const Sequalize = require('sequelize');

const db = require('../');
const booking = require('./booking');

const Room = db.define('rooms', {
  id: {
    type: Sequalize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  roomno: {
    type: Sequalize.INTEGER,
    field: 'RoomNo',
  },
  roomname: {
    type: Sequalize.STRING,
    field: 'RoomName',
  },
  price: {
    type: Sequalize.INTEGER,
    field: 'Price',
  },
  capacity: {
    type: Sequalize.INTEGER,
    field: 'Capacity',
  },
  description: {
    type: Sequalize.STRING,
    field: 'Description',
  },
  bed: {
    type: Sequalize.INTEGER,
    field: 'Bed',
  },
  bathroom: {
    type: Sequalize.STRING,
    field: 'BathRoom',
  },
  extra: {
    type: Sequalize.STRING,
    field: 'Extra',
  },
  images: {
    type: Sequalize.ARRAY(Sequalize.STRING),
    field: 'Images',
  },
});

Room.hasMany(booking, { sourceKey: 'roomno', foreignKey: 'roomno' });

module.exports = Room;
