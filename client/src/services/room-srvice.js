import Api from '../api';

const addRoom = (roomData) => {
  return new Promise((resolve, reject) => {
    Api.post('/admin/addroom', roomData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
export { addRoom };
