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

  const update = async (id, body) => {
    return new Promise((resolve, reject) => {
      food
        .findOne({
          where: {
            id,
          },
        })
        .then((data) => {
          const image = body.uImage.filter((item) => /images/.test(item));
          body.images = body.images.concat(image);
          delete body.uImage;
          data
            .update(body)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  };

  return {
    add,
    get,
    update,
  };
})();

module.exports = foodService;
