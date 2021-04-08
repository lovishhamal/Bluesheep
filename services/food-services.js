const food = require('../database/models/food');

const foodService = (() => {
  const add = async (data) => {
    return new Promise((resolve, reject) => {
      food
        .create(data)
        .then(() => resolve('Successfully added food.'))
        .catch((err) => console.log('err', err));
    });
  };

  const get = async () => {
    return new Promise((resolve, reject) => {
      food
        .findAll()
        .then((data) => resolve(data))
        .catch(() => reject('error'));
    });
  };

  const update = async (id, data) => {
    return new Promise((resolve, reject) => {
      food
        .update(data, { where: { id } })
        .then((data) => resolve(data))
        .catch(() => reject('error'));
    });
  };

  return {
    add,
    get,
    update,
  };
})();

module.exports = foodService;
