import Api from '../api';

const registerService = async (userData) => {
  return new Promise((resolve, reject) => {
    Api.post('/register', userData)
      .then((data) => resolve(data))
      .catch((err) => reject(err?.response?.data?.message));
  });
};

const loginService = async (userData) => {
  return new Promise((resolve, reject) => {
    Api.post('/login', userData)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const setToken = async (userData) => {
  return new Promise((resolve, reject) => {
    Api.patch('/', userData)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export { registerService, loginService, setToken };
