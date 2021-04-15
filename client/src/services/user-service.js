import Api from '../api';

const getUser = async () => {
  return new Promise((resolve, reject) => {
    Api.get('/')
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const searchUser = async (email) => {
  return new Promise((resolve, reject) => {
    Api.get(`/booking/search/${email}`)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const getBill = async (id, data) => {
  return new Promise((resolve, reject) => {
    Api.post(`/bill/${id}`, data)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export { getUser, searchUser, getBill };
