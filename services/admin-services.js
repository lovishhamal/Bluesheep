const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const users = require('../database/models/admin');
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
        .findAll({
          where: {
            [Op.or]: [
              { email: userData.email },
              { phone: userData.phone },
              { role: userData.role },
            ],
          },
        })
        .then(async (data) => {
          if (data.length < 1) {
            if (
              data
                .filter((item) => item.dataValues.role === 'super-admin')
                .flatMap((val) => val.dataValues.role)[0] === userData.role
            ) {
              return reject('Super Admin already exists');
            }

            const hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword;
            users
              .create(userData)
              .then((data) => resolve(data))
              .catch(() => reject('Error while registering'));
          } else {
            if (
              data
                .filter((item) => item.dataValues.role === 'super-admin')
                .flatMap((val) => val.dataValues.role)[0] === userData.role
            ) {
              return reject('Super Admin already exists');
            }
            if (data[0].email === userData.email) {
              return reject('Email already exists');
            }

            if (data[0].phone === userData.phone) {
              return reject('Phone No already exists');
            }
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword;
            users
              .create(userData)
              .then((data) => resolve(data))
              .catch(() => reject('Error while registering'));
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

  return {
    register,
    login,
  };
})();

module.exports = userService;
