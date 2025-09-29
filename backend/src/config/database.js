const { Sequelize } = require('sequelize');
const env = require('./env');

let sequelize;

if (env.DATABASE_URL && env.DB_DIALECT !== 'sqlite') {
  sequelize = new Sequelize(env.DATABASE_URL, {
    dialect: env.DB_DIALECT,
    logging: env.DB_LOGGING
  });
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: env.NODE_ENV === 'test' ? ':memory:' : env.SQLITE_PATH,
    logging: env.DB_LOGGING
  });
}

module.exports = sequelize;