const rooms = require('../database/models/rooms');
const roomService = (() => {
  const add = async (roomData) => {
    return new Promise((resolve, reject) => {
      rooms
        .create(roomData)
        .then(() => resolve('Successfully added room.'))
        .catch(() => reject('Error wile uploading.'));
    });
  };

  const get = async (userData) => {
    return new Promise((resolve, reject) => {
      rooms
        .findAll()
        .then((data) => resolve(data))
        .catch(() => reject('Couldnot get rooms'));
    });
  };

  return {
    add,
    get,
  };
})();

module.exports = roomService;
