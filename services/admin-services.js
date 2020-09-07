const rooms = require('../database/models/rooms');

const adminService = (() => {
  const addRoom = async (roomData) => {
    return new Promise((resolve, reject) => {
      rooms
        .create(roomData)
        .then(() => resolve('Successfully added room.'))
        .catch(() => reject('Error wile uploading.'));
    });
  };

  return {
    addRoom,
  };
})();

module.exports = adminService;
