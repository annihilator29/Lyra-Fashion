# CI/CD Pipeline Setup Guide

## Overview

This guide covers setting up the complete CI/CD pipeline for Lyra Fashion using Vercel for deployment and GitHub Actions for continuous integration.

## 🚀 **Quick Setup Steps**

### 1. Vercel Project Setup

**A. Install Vercel CLI (Optional but recommended)**
```bash
npm install -g vercel
# or use npx vercel if you prefer
```

**B. Create Vercel Project**
1. Go to [vercel.com](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository (lyra-fashion)
4. Configure project settings:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (root)
   - **Build Command:** `npm run build`
   - **Install Command:** `npm install`
   - **Output Directory:** `.next`

**C. Configure Environment Variables**
Add these environment variables in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://tjxpguthipsmakvtavth.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqeHBndXRoaXBzbWFrdnRhdnRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMzMxMjksImV4cCI6MjA3OTkwOTEyOX0.MwcMtikmuJwsvUIYziZDKXjlZKVGOe2fOY4X4SnhMEc
NODE_ENV=production
```

**D. Connect to Git Repository**
- Enable automatic deployments from Git
- Push to `main` branch should trigger deployments
- Pull requests should create preview deployments

### 2. GitHub Actions Setup (Optional)

**A. Add GitHub Secrets**
Go to GitHub Repository → Settings → Secrets and Variables → Actions, add:

```
VERCEL_TOKEN=your_vercel_personal_access_token
```

**B. Enable GitHub Actions**
- Go to Actions tab in your repository
- Enable workflows
- The CI/CD pipeline will run on every push to `main` or `develop`

## 📁 **Configuration Files Created**

### `vercel.json`
Vercel deployment configuration with:
- Build and install commands
- API route configuration
- Environment settings
- Headers and redirects

### `.github/workflows/ci-cd.yml`
GitHub Actions workflow for:
- Code linting and testing
- Build verification
- Automated deployment
- Health checks

## 🧪 **Testing the Pipeline**

### 1. Local Testing
```bash
# Install Vercel CLI globally (optional)
npm install -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Run build locally to test
npm run build

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 2. Automated Testing
1. Make a small change (like update a comment in README)
2. Commit and push to `main` branch
3. Check Vercel dashboard for deployment status
4. Verify the deployed URL works

### 3. Health Check Verification
After deployment, test these endpoints:
- **Health Endpoint:** `https://your-app.vercel.app/api/health`
- **Homepage:** `https://your-app.vercel.app/`
- **Design System:** `https://your-app.vercel.app/design-system`

Expected health response:
```json
{
  "status": "ok",
  "timestamp": "2025-11-28T18:50:00.000Z",
  "message": "Lyra Fashion API is healthy"
}
```

## 🔧 **Deployment Workflows**

### Development Workflow
1. Create feature branch from `main`
2. Make changes and test locally (`npm run build`)
3. Push to feature branch (triggers CI checks)
4. Create pull request to `main`
5. Vercel creates preview deployment
6. Review and test in preview environment
7. Merge to `main` (triggers production deployment)

### Manual Deployment
If GitHub Actions is not used:
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## 📊 **Monitoring & Logs**

### Vercel Dashboard
- **Functions:** View serverless function logs
- **Deployments:** See all deployment history
- **Analytics:** Monitor performance and usage
- **Settings:** Manage environment variables and domains

### GitHub Actions
- **Actions Tab:** View CI/CD workflow status
- **Logs:** Detailed build and deployment logs
- **Artifacts:** Download build outputs

## 🛠 **Troubleshooting**

### Common Issues

**Build Fails:**
- Check `npm run build` works locally
- Verify all dependencies are in `package.json`
- Check environment variables are set

**Environment Variables Not Working:**
- Ensure variable names match exactly (case-sensitive)
- Variables must be set in Vercel Dashboard
- Check they're marked for correct environment (Production/Preview/Development)

**Deployment Timeout:**
- Check build logs in Vercel Dashboard
- Optimize build process if needed
- Verify no infinite loops or long-running processes

**Health Check Fails:**
- Test endpoint locally: `curl http://localhost:3000/api/health`
- Check Supabase connection is working
- Verify environment variables are accessible

### Debug Commands
```bash
# Check build locally
npm run build

# Check lint locally
npm run lint

# Check deployment locally
vercel --debug

# View environment variables
vercel env ls
```

## 📝 **Next Steps**

1. **Domain Setup (Optional):**
   - Add custom domain in Vercel dashboard
   - Configure DNS records

2. **Monitoring:**
   - Set up error tracking (Sentry, etc.)
   - Add performance monitoring

3. **Advanced CI/CD:**
   - Add E2E tests in pipeline
   - Configure automatic rollbacks
   - Set up staging environments

## 🔗 **Useful Links**

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

---

**Setup Status:** ✅ Configuration Files Created  
**Next Step:** Follow Vercel project setup steps above  
**Support:** Check troubleshooting section or review deployment logs
