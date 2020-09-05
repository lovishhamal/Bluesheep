const Sequelize = require('sequelize');

module.exports = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  }
);
