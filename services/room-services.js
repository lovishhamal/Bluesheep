const rooms = require('../database/models/rooms');
const booking = require('../database/models/booking');

const roomService = (() => {
  const add = async (roomData) => {
    return new Promise((resolve, reject) => {
      rooms
        .create(roomData)
        .then(() => resolve('Successfully added room.'))
        .catch(() => reject('Error wile uploading.'));
    });
  };

  const get = async () => {
    return new Promise((resolve, reject) => {
      rooms
        .findAll()
        .then((data) => resolve(data))
        .catch(() => reject('Couldnot get rooms'));
    });
  };

  const book = async (body) => {
    return new Promise((resolve, reject) => {
      booking
        .create(body)
        .then((data) => resolve(data))
        .catch(() => reject('Couldnot get rooms'));
    });
  };

  const getBooking = async (id) => {
    return new Promise((resolve, reject) => {
      booking
        .findAll({ where: { user_id: id } })
        .then((data) => resolve(data))
        .catch(() => reject('Couldnot get rooms'));
    });
  };

  return {
    add,
    get,
    book,
    getBooking,
  };
})();

module.exports = roomService;
