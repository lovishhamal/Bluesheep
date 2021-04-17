const { Op } = require('sequelize');
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

  const searchBooked = (email) => {
    return new Promise((resolve, reject) => {
      users
        .findOne({ where: { email } })
        .then((res) => {
          if (res) {
            booking
              .findAll({
                where: {
                  status: 'Occupied',
                  user_id: res.dataValues.id,
                },
                include: [
                  {
                    model: users,
                  },
                ],
                order: [['start_date', 'ASC']],
              })
              .then((data) => resolve(data))
              .catch((err) => reject(err));
          } else {
            resolve(null);
          }
        })
        .catch((err) => reject(err));
    });
  };
  return {
    get,
    update,
    searchBooked,
  };
})();

module.exports = roomService;
