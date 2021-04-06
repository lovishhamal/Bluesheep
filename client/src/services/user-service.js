import Api from '../api';

const getUser = async () => {
  return new Promise((resolve, reject) => {
    Api.get('/')
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export { getUser };
