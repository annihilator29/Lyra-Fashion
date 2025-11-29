# Fix Guide: Next.js Version Downgrade

## Issue Summary
- **Story:** 1-1: Project Initialization & Repo Setup
- **Problem:** Next.js version 16.0.5 installed, but AC #1 requires Next.js 15
- **Current Status:** in-progress (due to review findings)
- **Required Action:** Downgrade to Next.js 15.x

## Step-by-Step Fix Instructions

### Step 1: Update package.json
Edit `lyra-fashion/package.json` and change the Next.js version:

**Current (INCORRECT):**
```json
"next": "16.0.5"
```

**Required (CORRECT):**
```json
"next": "^15.0.0"
```

### Step 2: Clean and Reinstall Dependencies
```bash
cd lyra-fashion

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clear npm cache (optional but recommended)
npm cache clean --force

# Install dependencies with correct Next.js version
npm install
```

### Step 3: Verify Installation
Check that Next.js 15 is installed:
```bash
npm list next
```

Expected output should show something like:
```
next@15.x.x
```

### Step 4: Test Application
```bash
# Test build
npm run build

# Test lint
npm run lint

# Test development server
npm run dev
```

### Step 5: Verify Folder Structure
Ensure the /src directory pattern is maintained:
```bash
ls -la src/
# Should show: app/, components/, lib/
```

### Step 6: Update Story Status
After successful testing, update the story status in `docs/sprint-status.yaml`:

**Change from:**
```yaml
1-1-project-initialization-repo-setup: in-progress
```

**Change to:**
```yaml
1-1-project-initialization-repo-setup: review
```

### Step 7: Update Story Completion Notes
Add to the completion notes in `docs/stories/1-1-project-initialization-repo-setup.md`:

```markdown
- **Fix Applied:** Downgraded Next.js from 16.0.5 to 15.0.0 to meet AC #1 requirements
- **Verification:** Build, lint, and dev server all tested successfully
- **Date Fixed:** 2025-11-28T19:57:05.616Z
```

## Alternative Method (if needed)

If the above doesn't work, you can use npm to specifically install Next.js 15:

```bash
cd lyra-fashion
npm install next@^15.0.0 --save
rm -rf node_modules package-lock.json
npm install
```

## Verification Checklist

After applying the fix, verify:
- [ ] `package.json` shows `"next": "^15.0.0"`
- [ ] `npm run build` completes successfully
- [ ] `npm run lint` passes without errors
- [ ] `npm run dev` starts development server on port 3000
- [ ] `src/app/` directory structure is maintained
- [ ] Application loads at `http://localhost:3000`

## Expected Outcome

After completing these steps:
1. ✅ Next.js version meets AC #1 requirement (Next.js 15)
2. ✅ All functionality remains intact
3. ✅ Application builds and runs correctly
4. ✅ Story ready for re-review
5. ✅ Status can be updated to "done" after re-review

## Notes

- This downgrade maintains all other project functionality
- React version 19.2.0 is compatible with Next.js 15
- TypeScript and Tailwind CSS configurations remain unchanged
- All design system and database setups are unaffected