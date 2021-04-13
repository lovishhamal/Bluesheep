import Api from '../api';

const loginAdminService = async (userData) => {
  return new Promise((resolve, reject) => {
    Api.post('/admin/login', userData)
      .then((data) => resolve(data))
      .catch((err) => reject(err?.response?.data?.message));
  });
};
const registerAdminService = async (userData) => {
  return new Promise((resolve, reject) => {
    Api.post('/admin/register', userData)
      .then((data) => resolve(data))
      .catch((err) => reject(err?.response?.data?.message));
  });
};

export { loginAdminService, registerAdminService };
