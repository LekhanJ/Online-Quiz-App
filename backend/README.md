# Quiz App Backend

Backend for the Online Quiz App. Provides authentication, quiz management, submissions, and results APIs.

## Stack

- **Runtime**: Node.js, Express
- **Database**: Sequelize ORM with SQLite by default (supports Postgres/MySQL/MariaDB/MSSQL)
- **Security**: Helmet, rate limiting, CORS
- **Testing**: Jest + Supertest

## Requirements

- Node.js 18+
- npm 9+

## Setup

- **Install dependencies**
  ```bash
  npm install
  ```

- **Environment variables** (`backend/.env`)
  - `NODE_ENV` = development | test | production
  - `PORT` = HTTP port (default 3000)
  - `JWT_SECRET` = strong secret (required)
  - `JWT_EXPIRES_IN` = e.g. 7d
  - `CORS_ORIGIN` = allowed origin URL or `*` (use a specific origin in production)
  - Database (choose one):
    - `DATABASE_URL` = full connection string (optional)
    - or `DB_DIALECT` = sqlite | postgres | mysql | mariadb | mssql (default sqlite)
      - For sqlite: `SQLITE_PATH` = quiz_app.db
  - `RATE_LIMIT_WINDOW_MIN` = window minutes (default 15)
  - `RATE_LIMIT_MAX` = max requests per window (default 100)

- **Run**
  ```bash
  # production
  npm start

  # development (auto-reload)
  npm run dev
  ```

## API Overview

Base path: `/api`

- **Auth**
  - `POST /api/auth/register`
  - `POST /api/auth/login`

- **Quiz**
  - `GET /api/quiz` — list quizzes
  - `GET /api/quiz/:id` — quiz details (auth)
  - `POST /api/quiz` — create quiz (auth)
  - `DELETE /api/quiz/:id` — delete quiz (auth/owner)
  - `POST /api/quiz/:id/submit` — submit answers (auth)
  - `GET /api/quiz/my-quizzes` — quizzes created by user (auth)
  - `GET /api/quiz/my-results` — user results (auth)

- **Health**
  - `GET /api/health`

Authentication uses Bearer JWT in `Authorization` header.

## Development & Testing

- Logs are enabled when `NODE_ENV !== 'test'`.
- Run tests:
  ```bash
  npm test
  ```

## Deployment Notes

- Set a strong `JWT_SECRET` and a specific `CORS_ORIGIN` (not `*`) if you use credentials.
- Ensure database variables are set for your target RDBMS.
- Expose the configured `PORT` and route traffic to `/api/*`.

## Security

- Helmet and rate limiting are enabled by default.
- Avoid `CORS_ORIGIN='*'` in production when cookies/credentials are needed.