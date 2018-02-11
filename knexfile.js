// Update with your config settings.
const path = require('path');

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'express_gallery_user',
      password : 'password',
      database : 'express_gallery',
      charset: 'utf8'
    },
    migrations: {
      directory: path.join(__dirname + '/knex/migrations'),
    },
    seeds: {
      directory: path.join(__dirname + '/knex/seeds')
    },
    debug: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
