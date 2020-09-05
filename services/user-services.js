const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const users = require('../database/models/register-user');
const { Op } = require('sequelize');

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
              .then(() => resolve('Successfully registered'))
              .catch(() => reject('Error while registering'));
          }

          if (data.email !== '' && data.email === userData.email) {
            return reject('Email already exists');
          }

          if (data.phoneno === userData.phoneno) {
            return reject('Phone No already exists');
          }
        });
    });
  };

  return {
    register,
  };
})();

module.exports = userService;
