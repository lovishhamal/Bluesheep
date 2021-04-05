const rooms = require('../database/models/rooms');
const booking = require('../database/models/booking');
const customers = require('../database/models/customers');
const moment = require('moment');
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
    return new Promise(async (resolve, reject) => {
      const data = await booking.findAll({
        where: {
          roomno: body.roomno,
        },
      });

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

      const data1 = await customers.findAll({ where: { roomno: body.roomno } });
      for (var i in data1) {
        if (
          body.start_date < data1[i].start_date &&
          body.end_date < data1[i].start_date
        ) {
        } else if (
          body.start_date > data1[i].end_date &&
          body.end_date > data1[i].end_date
        ) {
        } else {
          return reject('Booking not available on this date');
        }
      }
      body.start_date = moment(body.start_date).format('YYYY-MM-DD');
      body.end_date = moment(body.end_date).format('YYYY-MM-DD');
      booking
        .create(body)
        .then((data) => resolve(data))
        .catch(() => reject('Couldnot book room'));
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

  const getFindRooms = async (body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const findAllRooms = await rooms.findAll();

        const data = await booking.findAll({
          where: {
            roomname: body.room,
          },
        });

        if (data.length > 0) {
          var roomId = [];
          for (let i in data) {
            if (
              body.startDate < data[i].start_date &&
              body.endDate < data[i].start_date
            ) {
            } else if (
              body.startDate > data[i].end_date &&
              body.endDate > data[i].end_date
            ) {
            } else {
              roomId.push(data[i].roomid);
            }
          }

          const rooms = findAllRooms.filter(
            (val) => roomId.indexOf(val.id) < 0 && val.roomname === body.room
          );

          return resolve(rooms);
        }

        let filterRooms = findAllRooms.filter(
          (val) => val.roomname === body.room && val.capacity == body.guest
        );
        resolve(filterRooms);
      } catch (error) {
        reject(error);
      }
    });
  };

  const available = (body) => {
    return new Promise((resolve, reject) => {
      bookings
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

  return {
    add,
    get,
    book,
    getBooking,
    deleteBooking,
    getFindRooms,
    available,
  };
})();

module.exports = roomService;
