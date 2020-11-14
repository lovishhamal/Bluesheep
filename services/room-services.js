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
        .findAll({
          include: [
            {
              model: booking,
              attributes: ['user_id', 'end_date'],
            },
          ],
        })
        .then((data) => resolve(data))
        .catch(() => reject('Couldnot get rooms'));
    });
  };

  const book = async (body) => {
    return new Promise((resolve, reject) => {
      booking
        .findAll({
          where: {
            roomno: body.roomno,
          },
        })
        .then((data) => {
          if (data.length < 1) {
            booking
              .create(body)
              .then((data) => resolve(data))
              .catch(() => reject('Couldnot book room'));
          } else {
            for (var i in data) {
              if (
                body.start_date < data[i].start_date &&
                body.end_date < data[i].start_date
              ) {
              } else if (
                body.start_date > data[i].end_date &&
                body.end_date > data[i].end_date
              ) {
              } else {
                return reject('Booking not available on this date');
              }
            }
            booking
              .create(body)
              .then((data) => resolve(data))
              .catch(() => reject('Couldnot book room'));
          }
        });
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

  const deleteBooking = async (id) => {
    return new Promise((resolve, reject) => {
      booking
        .findOne({ where: { id } })
        .then((data) => {
          data.destroy();
          resolve();
        })
        .catch(() => reject('Couldnot get rooms'));
    });
  };

  return {
    add,
    get,
    book,
    getBooking,
    deleteBooking,
  };
})();

module.exports = roomService;
