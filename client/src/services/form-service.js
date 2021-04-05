import Api from '../api';

const addCustomer = async (userData) => {
  return new Promise((resolve, reject) => {
    Api.post('/customer', userData)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export { addCustomer };
