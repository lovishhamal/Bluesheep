const order = require('../database/models/order');
const food = require('../database/models/food');
const user = require('../database/models/register-user');

const orderService = (() => {
  const add = async (data) => {
    return new Promise((resolve, reject) => {
      order
        .create(data)
        .then(() => resolve('Successfully added order.'))
        .catch((err) => console.log('err', err));
    });
  };

  const get = async () => {
    return new Promise((resolve, reject) => {
      order
        .findAll()
        .then((data) => resolve(data))
        .catch(() => reject('error'));
    });
  };

  const getOrder = async (id) => {
    return new Promise((resolve, reject) => {
      order
        .findAll({
          where: { user_id: id },
          include: [{ model: user }, { model: food }],
        })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  const deleteOrder = async (id) => {
    return new Promise((resolve, reject) => {
      order
        .destroy({ where: { id } })
        .then((data) => resolve(data))
        .catch(() => reject('error'));
    });
  };

  return {
    add,
    get,
    deleteOrder,
    getOrder,
  };
})();

module.exports = orderService;
