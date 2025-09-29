# Online Quiz App Frontend

## Overview

React + TypeScript frontend for the Online Quiz App. Connects to the backend APIs to handle auth, quiz taking/creation, and results.

## Stack

- **Build tool**: Vite
- **UI**: React 19, Tailwind CSS
- **Routing**: React Router
- **State**: Zustand
- **HTTP**: Axios (`src/lib/api.ts`)

## Requirements

- Node.js 18+
- npm 9+

## Environment variables

Create `frontend/.env.development` for local dev and set as needed:

- `VITE_API_BASE_URL` — API base. If omitted, defaults to `/api` and Vite dev proxy will forward to the backend.
- `VITE_DEV_SERVER_PROXY_TARGET` — Backend URL for proxy (default `http://localhost:3000`). See `vite.config.ts`.

For production builds, set `VITE_API_BASE_URL` to your deployed backend URL, e.g. `https://api.example.com/api`.

## Development

Install deps and start the dev server:

```bash
npm install
npm run dev
```

- Vite serves the app at `http://localhost:5173`.
- When `VITE_API_BASE_URL` is not set, requests to `/api/*` are proxied to `VITE_DEV_SERVER_PROXY_TARGET` (see `vite.config.ts`). This avoids browser CORS in development.

## Build & Preview

```bash
npm run build
npm run preview
```

The production bundle is generated in `frontend/dist/`.

## Project structure

- `src/pages/` — route-level pages (e.g., `Login.tsx`, `TakeQuiz.tsx`, `CreateQuiz.tsx`)
- `src/components/` — UI and quiz components
- `src/store/` — Zustand stores (`authStore.ts`, `quizStore.ts`)
- `src/lib/api.ts` — Axios client; reads `VITE_API_BASE_URL` and adds `Authorization` header from `localStorage` token

## Authentication

- JWT token stored in `localStorage` as `token`. On 401, the app clears auth state and redirects to `/login`.

## Deployment

- Build with `npm run build` and serve `dist/` with your static host (Netlify, Vercel, Nginx, etc.).
- Set `VITE_API_BASE_URL` to the public backend URL before building.
- If hosting frontend and backend on the same domain, route `/api/*` to the backend to avoid CORS.

## Notes

- Do not commit `.env*` files with secrets.
- Ensure backend CORS allows your frontend origin in production.
