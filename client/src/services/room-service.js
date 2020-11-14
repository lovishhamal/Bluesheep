import Api from '../api';

const addRoom = async (roomData) => {
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

const getRoom = async () => {
  return new Promise((resolve, reject) => {
    Api.get('/room')
      .then(({ data }) => resolve(data))
      .catch((err) => reject(err));
  });
};

const bookRoom = async (data) => {
  return new Promise((resolve, reject) => {
    Api.post('/room/booking', data)
      .then(({ data }) => resolve(data))
      .catch((err) => reject(err));
  });
};

const getBooking = async (id) => {
  return new Promise((resolve, reject) => {
    Api.get(`/room/getbooking/${id}`)
      .then(({ data }) => resolve(data))
      .catch((err) => reject(err));
  });
};

const deleteBooking = async (id) => {
  return new Promise((resolve, reject) => {
    Api.delete(`/room/deletebooking/${id}`)
      .then(({ data }) => resolve(data))
      .catch((err) => reject(err));
  });
};

export { addRoom, getRoom, bookRoom, getBooking, deleteBooking };
