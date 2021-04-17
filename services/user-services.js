const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const users = require('../database/models/register-user');
const book = require('../database/models/booking');
const token = require('../database/models/notification-token');
const { Op } = require('sequelize');
const order = require('../database/models/order');
const Food = require('../database/models/food');

const JwtToken = (userData) => {
  return Jwt.sign(
    {
      iss: userData.name,
      sub: userData.id,
      data: userData,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    process.env.JWT_SECRET
  );
};

const userService = (() => {
  const register = async (userData) => {
    return new Promise((resolve, reject) => {
      users
        .findOne({
          where: {
            [Op.or]: [
              { email: userData.email || '' },
              { phoneno: userData.phoneno },
            ],
          },
        })
        .then(async (data) => {
          if (!data) {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword;
            users
              .create(userData)
              .then((data) => resolve(data))
              .catch(() => reject('Error while registering'));
          }

          if (data) {
            if (data.email === userData.email) {
              return reject('Email already exists');
            }

            if (data.phoneno === userData.phoneno) {
              return reject('Phone No already exists');
            }
          }
        });
    });
  };

  const login = async (userData) => {
    return new Promise((resolve, reject) => {
      users.findOne({ where: { email: userData.email } }).then(async (data) => {
        if (!data) return reject('Couldnot find email');
        const isPasswordMatch = await bcrypt.compare(
          userData.password,
          data.password
        );

        if (!isPasswordMatch) return reject('Password didnot match');
        resolve(JwtToken(data));
      });
    });
  };

  const get = () => {
    return new Promise((resolve, reject) => {
      users
        .findAll()
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  };
  const patch = (body) => {
    return new Promise((resolve, reject) => {
      token.findOne().then((data) => {
        if (data) {
          data
            .update(body)
            .then((item) => resolve(item))
            .catch((err) => reject(err));
        } else {
          token
            .create(body)
            .then((val) => resolve(val))
            .catch((err) => reject(err));
        }
      });
    });
  };

  const search = (email) => {
    return new Promise((resolve, reject) => {
      users
        .findOne({ where: { email } })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  const bill = (id, body) => {
    return new Promise(async (resolve, reject) => {
      const food = order.findAll({
        where: {
          user_id: id,
          order_date: {
            [Op.and]: {
              [Op.gte]: new Date(body.start_date),
              [Op.lte]: new Date(body.end_date),
            },
          },
        },
        include: [{ model: Food }],
      });
      const booking = book.findAll({
        where: {
          user_id: id,
          start_date: { [Op.gte]: new Date(body.start_date) },
          end_date: { [Op.lte]: new Date(body.end_date) },
        },
      });
      Promise.all([food, booking]).then((data) => {
        resolve({ food: data[0], booking: data[1] });
      });
    });
  };

  const checkout = (id) => {
    return new Promise((resolve, reject) => {
      book
        .update({ status: 'Checkout' }, { where: { id } })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  return {
    register,
    login,
    get,
    patch,
    search,
    bill,
    checkout,
  };
})();

module.exports = userService;
