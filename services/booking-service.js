const booking = require('../database/models/booking');
const users = require('../database/models/register-user');

const roomService = (() => {
  const get = async () => {
    return new Promise((resolve, reject) => {
      booking
        .findAll({
          include: [
            {
              model: users,
            },
          ],
          order: [['start_date', 'ASC']],
        })
        .then((data) => {
          if (data) {
            resolve(data);
          }
        })
        .catch(() => reject('Couldnot get rooms'));
    });
  };
  const update = async (id) => {
    return new Promise((resolve, reject) => {
      booking
        .update(
          { status: 'Occupied' },
          {
            where: {
              id,
            },
          }
        )
        .then((data) => {
          if (data) {
            resolve(data);
          }
        })
        .catch(() => reject('Couldnot get rooms'));
    });
  };
  return {
    get,
    update,
  };
})();

module.exports = roomService;
