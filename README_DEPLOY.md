# Deploying Annapoorna Backend

This document explains quick deployment steps for the `annapoorna-backend` Node/Express app.

Recommended hosts: Render, Railway, Heroku. Example below uses Render.

Required environment variables (set these in the host UI):

- `MONGO_URI` — MongoDB connection string (use MongoDB Atlas)
- `JWT_SECRET` — strong random secret for JWTs
- `PORT` — e.g. `5001` (Render sets a port automatically; your app falls back to `process.env.PORT`)
- `FRONTEND_URL` — `https://<your-frontend-url>` (used by CORS whitelist)
- `AWS_ACCESS_KEY_ID` — (if using S3 uploads)
- `AWS_SECRET_ACCESS_KEY` — (if using S3 uploads)
- `AWS_BUCKET_NAME` — S3 bucket name
- `AWS_REGION` — S3 region

Render (quick)
1. Push code to GitHub (this repo).
2. Go to https://render.com and create a new **Web Service**.
3. Connect your GitHub repo and choose the `annapoorna-backend` folder as the root (if monorepo).
4. Build Command: leave blank (Render runs `npm install` by default) or set `npm install`.
5. Start Command: `npm start` (your `package.json` has `start: node server.js`).
6. Add the environment variables listed above in Render's UI.
7. Deploy and visit the generated service URL.

Notes on uploads
- The app currently supports local `uploads/` and Amazon S3. For production, prefer S3 and ensure AWS keys are set as environment variables in the host.

Rolling back / troubleshooting
- Check Render service logs for startup errors.
- If the app cannot connect to MongoDB, verify `MONGO_URI` and Atlas network access.

Security
- Never commit `.env` files. Rotate any keys that were committed previously.
