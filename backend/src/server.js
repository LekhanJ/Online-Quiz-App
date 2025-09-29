const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const env = require('./config/env');
const sequelize = require('./config/database');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');

const app = express();
const PORT = env.PORT;

app.use(helmet());

app.use(cors({ origin: env.CORS_ORIGIN, credentials: false }));

app.use(express.json({ limit: '1mb' }));

if (env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MIN * 60 * 1000,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api', limiter);

app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Quiz App API is running' });
});

app.use(notFoundHandler);

app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');

    await sequelize.sync();
    console.log('Database synced');

    if (env.NODE_ENV !== 'test') {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  } catch (error) {
    console.error('Unable to start server:', error);
  }
};

startServer();

module.exports = app;