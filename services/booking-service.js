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
        })
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
  };
})();

module.exports = roomService;
