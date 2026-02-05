# Sobapp — Tech Job Board

A Dice-style tech job site built with **Next.js 14**, **MongoDB**, and **Mongoose**. Find jobs, career resources, and apply in one place. All data stored in MongoDB.

## Features

- **Home** — Hero with search, stats, dual CTAs (job seekers / employers), career resources, featured jobs, testimonials, browse by role/skill
- **About** — Company story, how we work, tech stack
- **Jobs** — List with filters (department, type), job detail pages
- **Apply** — Application form per job (resume link, portfolio, message)
- **Contact** — Contact form
- **API** — `GET/POST /api/jobs`, `POST /api/apply`, `POST /api/contact`

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment**
   - Copy `.env.example` to `.env.local`
   - Set `MONGODB_URI` (e.g. `mongodb://localhost:27017/company` or your Atlas connection string)

3. **Run MongoDB**
   - Local: start MongoDB on your machine
   - Or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and put the connection string in `MONGODB_URI`

4. **Run the app**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Adding jobs

Jobs are stored in MongoDB. You can add them via the API:

```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Frontend Engineer",
    "department": "Frontend",
    "location": "Remote",
    "type": "Full-time",
    "description": "We are looking for a frontend engineer...",
    "requirements": ["3+ years React", "TypeScript", "CSS"]
  }'
```

Or use any MongoDB client (Compass, mongosh) to insert documents into the `jobs` collection with the same shape as the `Job` model in `src/models/Job.ts`.

## Deploy on your VPS

1. Build: `npm run build`
2. Run with Node: `npm start` (or use **PM2** to keep it running)
3. Put **Nginx** in front as reverse proxy to `http://127.0.0.1:3000`
4. Point your **domain** A record to the VPS IP
5. Use **Certbot** for HTTPS (Let’s Encrypt)
6. Set `MONGODB_URI` in the environment on the server (e.g. in PM2 env or `.env`)

## Replacing logo and images

- **Logo:** Edit `src/components/Logo.tsx` (SVG) or replace `public/logo.svg`. App icon: `src/app/icon.tsx`.
- **Hero image:** Replace the placeholder in the hero section on `src/app/page.tsx` (`.heroImagePlaceholder`) with your own image or link.
