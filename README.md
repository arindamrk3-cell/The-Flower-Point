# The Flower Point

A flower decoration website for weddings, puja ceremonies, and social events.

## Project Structure

- `frontend/` — React + Vite app
- `backend/` — Express + MongoDB API

## Local Development

### Frontend

```bash
cd frontend
npm install
npm run dev -- --host
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## Production Build

```bash
cd frontend
npm run build
```

## Deployment

### Frontend (Vercel / Netlify)

- Root directory: `frontend`
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable:
  - `VITE_API_URL=https://your-backend-domain/api`

### Backend (Render / Railway)

- Root directory: `backend`
- Start command: `npm start`
- Environment variables:
  - `PORT=5000`
  - `MONGO_URI=mongodb+srv://...`
  - `JWT_SECRET=your_secret_key`
  - `CLOUDINARY_CLOUD_NAME=...`
  - `CLOUDINARY_API_KEY=...`
  - `CLOUDINARY_API_SECRET=...`

## Important Notes

- The frontend API URL is configured in [frontend/services/api.js](frontend/services/api.js) using `import.meta.env.VITE_API_URL`.
- The backend server is initialized in [backend/server.js](backend/server.js).
- MongoDB is optional at startup if `MONGO_URI` is not set, but your app will not fully function without it.
