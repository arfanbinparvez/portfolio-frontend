# Portfolio Frontend

React + Vite. Deployed standalone on Vercel — calls a separate backend
(`portfolio-backend`, deployed on Northflank) for the contact form and visit
counter.

## Why two separate projects

This used to be one combined Express app serving both the built frontend and
the API. It's now split in two:

- **This repo** — just the static React site, on Vercel (instant loads,
  never sleeps).
- **`portfolio-backend`** — just the two API routes, on Northflank.

Vercel builds and hosts this repo. This repo's JS calls the backend's URL
directly (see `src/config.js`) rather than a relative `/api/...` path, since
they're no longer on the same domain.

## Local development

You need the backend running too — see `portfolio-backend`'s README.

```bash
npm install
cp .env.example .env   # localhost:3000 default works if the backend is running locally
npm run dev
```
Open `http://localhost:5173`.

## Deploy on Vercel

1. Push this folder to its own GitHub repo (e.g. `portfolio-frontend`) —
   separate from the backend repo.
2. [vercel.com](https://vercel.com) → New Project → import that repo.
3. Framework preset: Vite (auto-detected).
4. Before deploying, add an environment variable:
   - `VITE_API_URL` = your deployed Northflank backend's URL (e.g.
     `https://portfolio-backend--xxxxx.code.run`), **no trailing slash**.
   - If you haven't deployed the backend yet, deploy that first — you need
     its URL for this step.
5. Deploy. You'll get a URL like `arfan-portfolio.vercel.app`.
6. **Important:** go back to the backend's Northflank environment variables
   and set `FRONTEND_URL` to this Vercel URL — without it, the backend's
   CORS setting will block this frontend's requests.

## Structure

```
portfolio-frontend/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
└── src/
    ├── main.jsx
    ├── App.jsx          # all page content
    ├── config.js        # reads VITE_API_URL — the one thing that changed for the split
    ├── ContactForm.jsx  # posts to `${API_URL}/api/contact`
    ├── VisitCounter.jsx # posts to `${API_URL}/api/visits`
    └── index.css        # design system
```

## Before you deploy — things to personalize

- [ ] Add real links to each project's GitHub repo in `src/App.jsx`.
- [ ] Double check phone/email in the Contact section are ones you want public.
- [ ] Deploy `portfolio-backend` first, then set `VITE_API_URL` here and
      `FRONTEND_URL` there — they need each other's URLs to talk.
