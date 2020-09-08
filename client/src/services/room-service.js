import Api from '../api';

const addRoom = (roomData) => {
  return new Promise((resolve, reject) => {
    Api.post('/room/addroom', roomData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const getRoom = () => {
  return new Promise((resolve, reject) => {
    Api.get('/room')
      .then(({ data }) => resolve(data))
      .catch((err) => reject(err));
  });
};
export { addRoom, getRoom };
