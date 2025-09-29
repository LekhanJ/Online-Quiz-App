const Joi = require('joi');
const dotenv = require('dotenv');

dotenv.config();

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().port().default(3000),

  JWT_SECRET: Joi.string().min(16).required(),
  JWT_EXPIRES_IN: Joi.string().default('7d'),

  CORS_ORIGIN: Joi.alternatives().try(
    Joi.string().uri({ scheme: [/https?/] }),
    Joi.string().valid('*')
  ).default('*'),

  RATE_LIMIT_WINDOW_MIN: Joi.number().integer().min(1).default(15),
  RATE_LIMIT_MAX: Joi.number().integer().min(1).default(100),

  DATABASE_URL: Joi.string().uri().optional(),
  DB_DIALECT: Joi.string().valid('sqlite', 'postgres', 'mysql', 'mariadb', 'mssql').default('sqlite'),
  SQLITE_PATH: Joi.string().default('quiz_app.db'),
  DB_LOGGING: Joi.boolean().default(false)
}).unknown(true);

const { value: env, error } = envSchema.validate(process.env, { abortEarly: false, stripUnknown: true });

if (error) {
  throw new Error(`Invalid environment configuration: ${error.message}`);
}

module.exports = env;
