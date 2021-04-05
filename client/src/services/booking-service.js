import Api from '../api';

const getBookingService = async () => {
  return new Promise((resolve, reject) => {
    Api.get('/booking')
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const getCustomerService = async () => {
  return new Promise((resolve, reject) => {
    Api.get('/customer')
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export { getBookingService, getCustomerService };
