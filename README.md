# ByteStreak — Single Vercel Deployment Guide

ByteStreak is a full-stack DSA practice platform. Both frontend and backend are deployed as a **single Vercel project** — one URL, zero CORS issues.

## Architecture

```
Vercel Project (one deployment)
├── /api/*        → Node.js serverless function (api/index.js)
├── /             → pages/index.html
├── /problems     → pages/problems.html
├── /problem      → pages/problem.html
├── /daily        → pages/daily.html
├── /topics       → pages/topics.html
├── /leaderboard  → pages/leaderboard.html
├── /login        → pages/login.html
├── /signup       → pages/signup.html
└── /profile      → pages/profile.html
```

## Folder Structure

```
byteStreak/
├── api/
│   └── index.js              ← Backend entry point (Vercel serverless)
├── lib/
│   ├── controllers/          ← Route handlers
│   ├── middleware/           ← Auth + async error handling
│   ├── models/               ← Mongoose schemas
│   └── routes/               ← Express routers
├── pages/                    ← All HTML pages
├── css/
│   └── style.css
├── js/
│   ├── config.js             ← API base URL config
│   └── script.js             ← Shared utilities
├── seed.js                   ← Database seeder
├── vercel.json               ← Vercel routing config
└── package.json
```

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env` file at root

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net
```

### 3. Seed the database (first time)

```bash
npm run seed
```

### 4. Start local server

```bash
npm run dev
```

Open: `http://localhost:5000`
> Pages are served at `http://localhost:5000/pages/index.html` locally.
> On Vercel they're served at `https://your-app.vercel.app/`

## Vercel Deployment

### Step 1 — Push code to GitHub

```bash
git add .
git commit -m "ready for vercel deployment"
git push origin main
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Click **"Add New Project"**
3. Import your GitHub repo
4. **Root Directory**: leave as `.` (root) — do NOT change this
5. **Framework Preset**: Other
6. **Build Command**: leave empty
7. **Output Directory**: leave empty

9. Click **Deploy**
10. Your app is live at `https://bytestreak.vercel.app` (or similar URL)

### Step 3 — Test your deployment

1. Visit `https://your-app.vercel.app`
2. Test `/api/health` — should return `{"status":"ok",...}`
3. Try signup at `/signup`
4. Try login at `/login`
5. Browse problems at `/problems`

## CI/CD with GitHub Actions

### Add GitHub Secrets

Go to: **GitHub repo → Settings → Secrets → Actions**

| Secret | Where to find it |
|--------|-----------------|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Vercel dashboard → Settings → Team ID |
| `VERCEL_PROJECT_ID` | Your Vercel project → Settings → Project ID |

After adding secrets, every push to `main` will auto-deploy.

## API Routes

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/signup` | No | Create account |
| POST | `/api/auth/login` | No | Login |
| GET | `/api/auth/me` | Yes | Get current user |
| GET | `/api/problems` | No | List all problems |
| GET | `/api/problems/daily` | No | Today's problem |
| GET | `/api/problems/:id` | No | Get single problem |
| GET | `/api/problems/filter` | No | Filter problems |
| POST | `/api/problems` | Yes | Add problem |
| DELETE | `/api/problems/:id` | Yes | Delete problem |
| POST | `/api/submissions` | Yes | Submit solution |
| GET | `/api/submissions/me` | Yes | My submissions |
| GET | `/api/submissions/:problemId` | No | Problem submissions |
| GET | `/api/users/leaderboard` | No | Leaderboard |
| GET | `/api/health` | No | Health check |

## Tech Stack

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Node.js + Express.js (Vercel serverless)
- **Database**: MongoDB Atlas
- **Auth**: JWT + bcryptjs
- **Deployment**: Vercel (single project)
