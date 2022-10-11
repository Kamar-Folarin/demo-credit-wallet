// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

 const path = require('path');

 require('dotenv').config({path:path.join(__dirname,'../.env')});

 console.dir(process.env);

 module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      port: process.env.PORT,
    },
    migrations: {
      directory: path.join(__dirname, './db/migrations')
    }},  
};