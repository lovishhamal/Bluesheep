import Api from '../api';

const addFood = async (userData) => {
  return new Promise((resolve, reject) => {
    Api.post('/food', userData)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const getFood = async () => {
  return new Promise((resolve, reject) => {
    Api.get('/food')
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const editFood = async (id, data) => {
  return new Promise((resolve, reject) => {
    Api.patch(`/food/${id}`, data)
      .then(({ data }) => resolve(data))
      .catch((err) => reject(err));
  });
};

const deleteFood = async (id) => {
  return new Promise((resolve, reject) => {
    Api.delete(`/food/${id}`)
      .then(({ data }) => resolve(data))
      .catch((err) => reject(err));
  });
};

export { addFood, getFood, editFood, deleteFood };
