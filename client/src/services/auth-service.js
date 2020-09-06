import Api from '../api';

const registerService = async (userData) => {
  return new Promise((resolve, reject) => {
    Api.post('/register', userData)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const loginService = async (userData) => {
  return new Promise((resolve, reject) => {
    Api.post('/login', userData)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export { registerService, loginService };
