const order = require('../database/models/order');
const food = require('../database/models/food');

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
        .findAll({ where: { user_id: id }, include: [{ model: food }] })
        .then((data) => console.log('update -> ', data))
        .catch((err) => console.log('error -> ', err));
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
