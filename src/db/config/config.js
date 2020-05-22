require('dotenv').config(); // this is important!

const defaults = {
  username: 'mintbean',
  password: 'password',
  host: '127.0.0.1',
  dialect: 'postgres',
  operatorsAliases: false
};

module.exports = {
  development: Object.assign({}, defaults, {
    database: 'mintbean_development'
  }),
  test: Object.assign({}, defaults, {
    database: 'mintbean_test'
  }),
  production: Object.assign({}, defaults, {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  })
};
