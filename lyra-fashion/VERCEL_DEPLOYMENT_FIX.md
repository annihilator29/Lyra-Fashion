# Vercel Deployment Fix

**Issue Fixed:** 2025-11-28T19:21:00Z

## Problem
During Vercel deployment, you encountered this error:
```
Invalid request: should NOT have additional property `frameworkVersion`. Please remove it.
```

## Root Cause
The `vercel.json` configuration file contained invalid properties that are not supported by Vercel's configuration schema.

## Solution Applied
**Fixed Properties Removed:**
- ❌ `frameworkVersion` - Not a valid Vercel config property
- ❌ `gitLFS` - Not needed for this project
- ❌ `publicSource` - Default behavior is sufficient
- ❌ `rootDirectory` - Not needed (project is in root)
- ❌ `serverFileExcludes` - Not needed for this setup
- ❌ `staticFileExcludes` - Not needed for this setup
- ❌ `env` - Environment variables should be set in Vercel Dashboard, not config file

## Updated Configuration

**New `vercel.json` (Clean & Valid):**
```json
{
  "version": 2,
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "functions": {
    "src/app/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-store"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/healthz",
      "destination": "/api/health"
    }
  ]
}
```

## Environment Variables Setup

**Important:** Environment variables should be configured in Vercel Dashboard, not in `vercel.json`.

**Setup Steps:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add these variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://tjxpguthipsmakvtavth.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   NODE_ENV=production
   ```

## Deployment Instructions

**Step 1: Try Deployment Again**
```bash
# If you have Vercel CLI installed
vercel

# Or push to main branch to trigger GitHub deployment
git add .
git commit -m "Fix vercel.json configuration"
git push origin main
```

**Step 2: Verify Deployment**
1. Check Vercel Dashboard for successful deployment
2. Visit your deployment URL
3. Test the health endpoint: `https://your-app.vercel.app/api/health`

## Validation

**Build Test (Local):**
```bash
cd lyra-fashion
npm run build
```

**Expected Result:** Build should complete successfully without errors.

## What Changed

| Property | Status | Reason |
|----------|--------|--------|
| `frameworkVersion` | ❌ Removed | Not supported by Vercel |
| `gitLFS` | ❌ Removed | Not needed |
| `publicSource` | ❌ Removed | Default behavior sufficient |
| `rootDirectory` | ❌ Removed | Project in root |
| `serverFileExcludes` | ❌ Removed | Not needed |
| `staticFileExcludes` | ❌ Removed | Not needed |
| `env` in config | ❌ Removed | Use Vercel Dashboard instead |

## Next Steps

1. **Redeploy:** Try your deployment again with the fixed configuration
2. **Environment Setup:** Configure environment variables in Vercel Dashboard
3. **Test:** Verify the deployed app works correctly
4. **Monitor:** Check Vercel logs for any additional issues

## If You Still Have Issues

**Common Next Steps:**
1. Check Vercel Dashboard → Functions tab for runtime errors
2. Verify environment variables are set correctly
3. Check build logs for any dependency issues
4. Test locally: `npm run build && npm run start`

---

**Status:** ✅ Configuration Fixed  
**Action Required:** Redeploy with updated configuration  
**Support:** Check Vercel deployment logs for any additional issues
