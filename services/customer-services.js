const booking = require('../database/models/booking');
const customer = require('../database/models/customers');
const moment = require('moment');
const users = require('../database/models/register-user');

const customerService = (() => {
  const addCustomer = async (body) => {
    return new Promise(async (resolve, reject) => {
      const data = await booking.findAll({ where: { roomno: body.roomno } });
      for (var i in data) {
        if (
          body.start_date < data[i].start_date &&
          body.end_date < data[i].start_date
        ) {
        } else if (
          body.start_date > data[i].end_date &&
          body.end_date > data[i].end_date
        ) {
        } else {
          return reject('Booking not available on this date');
        }
      }

      const data1 = await customer.findAll({ where: { roomno: body.roomno } });
      for (var i in data1) {
        if (
          body.start_date < data1[i].start_date &&
          body.end_date < data1[i].start_date
        ) {
        } else if (
          body.start_date > data1[i].end_date &&
          body.end_date > data1[i].end_date
        ) {
        } else {
          return reject('Booking not available on this date');
        }
      }
      body.start_date = moment(body.start_date).format('YYYY-MM-DD');
      body.end_date = moment(body.end_date).format('YYYY-MM-DD');

      customer
        .create(body)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  const getCustomer = () => {
    return new Promise((resolve, reject) => {
      customer
        .findAll({
          include: [
            {
              model: users,
            },
          ],
        })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  };
  return {
    addCustomer,
    getCustomer,
  };
})();

module.exports = customerService;
