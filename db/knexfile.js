// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'OCTavia.1',
      database: 'demowallet',
      port: 3306,
    },
  },
};