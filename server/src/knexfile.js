// Uncomment if you want to do migrations
// require('dotenv').config({ path: './../.env' });
require('dotenv').config();

module.exports = {
  client: 'postgresql',
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'migrations'
  }
};
