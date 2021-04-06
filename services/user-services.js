const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const users = require('../database/models/register-user');
const { Op } = require('sequelize');

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
  return {
    register,
    login,
    get,
  };
})();

module.exports = userService;
