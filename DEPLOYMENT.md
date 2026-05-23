# ByteStreak - Vercel & GitHub CI/CD Deployment Guide

This project is fully ready for direct deployment to **Vercel** and includes a complete, pre-configured **GitHub Actions CI/CD Pipeline** for automated, professional test-and-deploy workflows!

---

## 🚀 Option 1: Direct Vercel Git Integration (Simplest)

Vercel can automatically track your GitHub repository and redeploy every time you push to the `main` branch.

1. **Push to GitHub**: Make sure your local codebase is pushed to your GitHub repository.
2. **Import to Vercel**: 
   * Go to [Vercel](https://vercel.com) and log in.
   * Click **Add New** -> **Project**.
   * Select your `byteStreak` repository.
3. **Configure Environment Variables (CRITICAL)**:
   Before deploying, expand the **Environment Variables** section and add:
   * `MONGO_URI`: Your MongoDB Connection String.
   * `JWT_SECRET`: Your secret key (e.g. `bytestreak_super_secret_key_2026`).
4. **Deploy**: Click **Deploy**. Vercel will build and launch your application!

---

## 🤖 Option 2: Professional GitHub Actions CI/CD Pipeline

We have created an automated deployment workflow under `.github/workflows/deploy.yml`. Every time you push to `main` or merge a Pull Request, GitHub Actions will compile, build, and deploy the application to Vercel automatically.

### Setup Instructions:

To enable the automated GitHub CI/CD pipeline, you need to add three secrets to your GitHub repository:

1. **Generate a Vercel Access Token**:
   * Go to your **Vercel Account Settings** -> **Tokens**.
   * Click **Create** to generate a new Personal Access Token.
   * Copy the token value.

2. **Retrieve Vercel Project Details**:
   * Install Vercel CLI locally (`npm install -g vercel`) if not already installed.
   * Run `vercel link` inside your project root directory and link it to your Vercel project.
   * This generates a `.vercel/project.json` file.
   * Open `.vercel/project.json` to find your `orgId` and `projectId`.

3. **Add GitHub Secrets**:
   * Go to your repository page on **GitHub**.
   * Click **Settings** -> **Secrets and variables** -> **Actions**.
   * Click **New repository secret** and add the following three secrets:

| Secret Name | Value |
| :--- | :--- |
| **`VERCEL_TOKEN`** | The Vercel Personal Access Token you generated |
| **`VERCEL_ORG_ID`** | The `orgId` from `.vercel/project.json` |
| **`VERCEL_PROJECT_ID`** | The `projectId` from `.vercel/project.json` |

Once added, every single push to your `main` branch will automatically trigger the GitHub Action run to build and publish the live production build!

---

## 🛠️ Verification of Configurations

Your files have been fully optimized:
1. **`vercel.json`**: Configured with clean paths and automatic rewrites. Extensionless routing (e.g. `/problems`) works beautifully.
2. **`api/index.js`**: Optimized database connection caching for Serverless warm starts to prevent database connection limits and maximize performance.
3. **`public/js/config.js`**: Robust environment detection. Automatically routes requests to your local backend on `localhost:5000` during local testing or direct file openings, and uses Vercel Serverless `/api` routes in production.
4. **Security**: Sensitive database credentials in `.env` are safely ignored by git (`.gitignore`), so they will never leak to public repositories.
