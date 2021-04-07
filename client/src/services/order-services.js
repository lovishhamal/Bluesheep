import Api from '../api';

const addOrder = async (userData) => {
  return new Promise((resolve, reject) => {
    Api.post('/order', userData)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const getOrder = async () => {
  return new Promise((resolve, reject) => {
    Api.get('/order')
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
const getMyOrder = async (id) => {
  return new Promise((resolve, reject) => {
    Api.get(`/order/${id}`)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
const deleteMyOrder = async (id) => {
  return new Promise((resolve, reject) => {
    Api.delete(`/order/delete/${id}`)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export { addOrder, getOrder, getMyOrder, deleteMyOrder };
