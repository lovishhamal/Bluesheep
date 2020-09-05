import Api from '../Api';

const registerService = async (userData) => {
  return new Promise((resolve, reject) => {
    Api.post('/register', userData)
      .then((data) => resolve(data))
      .catch((err) => console.log('poro -> ', err));
  });
};

export { registerService };
