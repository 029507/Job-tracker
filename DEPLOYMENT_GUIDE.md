# 🚀 Deployment Guide - Render & Netlify

This guide will walk you through deploying the Job Tracker application to production using Render (backend) and Netlify (frontend).

## Prerequisites

- GitHub account (already connected to your repo)
- Render account (free tier available at https://render.com)
- Netlify account (free tier available at https://netlify.com)

---

## Part 1: Deploy Backend to Render

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub (recommended for easy deployment)
3. Authorize Render to access your GitHub repositories

### Step 2: Create PostgreSQL Database on Render
1. In Render dashboard, click **"New +"** → **"PostgreSQL"**
2. Fill in the details:
   - **Name**: `job-tracker-db`
   - **Database**: `jobtracker`
   - **User**: `jobtracker`
   - **Region**: Choose closest to you
   - **PostgreSQL Version**: 15
3. Click **"Create Database"**
4. Wait for database to be created (5-10 minutes)
5. Copy the **Internal Database URL** (you'll need this)

### Step 3: Deploy Backend Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository `029507/Job-tracker`
3. Fill in the details:
   - **Name**: `job-tracker-api`
   - **Region**: Same as database
   - **Branch**: `master`
   - **Runtime**: `Node`
   - **Build Command**: `cd backend && npm install && npx prisma generate && npm run build`
   - **Start Command**: `cd backend && npx prisma migrate deploy && npm start`
4. Click **"Advanced"** and add Environment Variables:
   ```
   DATABASE_URL = <paste the Internal Database URL from Step 2>
   JWT_SECRET = your-super-secret-jwt-key-change-this-in-production
   NODE_ENV = production
   PORT = 10000
   ```
5. Click **"Create Web Service"**
6. Wait for deployment (5-10 minutes)
7. Once deployed, copy your backend URL (e.g., `https://job-tracker-api.onrender.com`)

### Step 4: Verify Backend Deployment
1. Visit `https://your-backend-url/api/auth/login` (should show an error or response)
2. Check Render logs for any errors

---

## Part 2: Deploy Frontend to Netlify

### Step 1: Create Netlify Account
1. Go to https://netlify.com
2. Sign up with GitHub
3. Authorize Netlify to access your repositories

### Step 2: Deploy Frontend
1. Click **"Add new site"** → **"Import an existing project"**
2. Select GitHub and choose `029507/Job-tracker`
3. Fill in the details:
   - **Team**: Your team
   - **Repository**: `Job-tracker`
   - **Branch**: `master`
4. Click **"Deploy site"** (wait for automatic setup)
5. In Site settings, configure Build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`

### Step 3: Set Environment Variables
1. In Netlify dashboard, go to **Site settings** → **Build & deploy** → **Environment**
2. Click **"Edit variables"** and add:
   ```
   REACT_APP_API_URL = https://your-backend-url/api
   ```
   Replace `your-backend-url` with your Render backend URL from Part 1, Step 3

3. Click **"Save"**

### Step 4: Trigger New Deploy
1. Go to **Deploys** → **Trigger deploy** → **Deploy site**
2. Wait for deployment to complete
3. Once done, Netlify will provide your frontend URL (e.g., `https://job-tracker-xyz.netlify.app`)

### Step 5: Verify Frontend Deployment
1. Visit your Netlify frontend URL
2. Test the login/registration flow
3. Check browser console for any errors

---

## Part 3: Final Configuration

### Update Backend CORS (if needed)
If you get CORS errors, update `backend/src/index.ts`:

```typescript
const allowedOrigins = [
  'https://your-netlify-frontend-url.netlify.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
```

Then commit and push:
```bash
git add backend/src/index.ts
git commit -m "Update CORS for production URL"
git push origin master
```

Render will auto-redeploy.

### Database Initialization
After first deployment, you may need to run migrations:

1. In Render dashboard, go to your backend service
2. Click **"Shell"** tab
3. Run: `npx prisma migrate deploy`

---

## Testing Your Deployment

### Backend Testing
```bash
# Test authentication endpoint
curl -X POST https://your-backend-url/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'

# Should return user data or error
```

### Frontend Testing
1. Open your Netlify URL
2. Register a new account
3. Add a job application
4. Check Analytics dashboard
5. All features should work

---

## Live URLs

After deployment, update these in your portfolio/README:

- **Frontend**: `https://your-netlify-domain.netlify.app`
- **Backend API**: `https://your-render-service.onrender.com/api`
- **GitHub Repo**: `https://github.com/029507/Job-tracker`

---

## Troubleshooting

### Issue: CORS Error on Frontend
**Solution**: Update `REACT_APP_API_URL` in Netlify environment variables to match your Render backend URL exactly.

### Issue: Database Connection Error
**Solution**: 
- Verify `DATABASE_URL` in Render environment variables
- Check if PostgreSQL database is running in Render dashboard
- Run migrations: `npx prisma migrate deploy`

### Issue: Build Fails on Netlify
**Solution**:
- Check build logs in Netlify
- Ensure all dependencies are in `package.json`
- Try clearing cache: **Deploys** → **Trigger deploy** → **Clear cache and deploy**

### Issue: Login Not Working
**Solution**:
- Check if backend is running: visit backend URL in browser
- Verify `JWT_SECRET` is set in Render
- Check browser console for CORS or API errors

---

## Monitoring & Logs

### Render
- View logs: Dashboard → Service → Logs
- Monitor resource usage: Dashboard → Service → Resources
- Redeploy anytime: Dashboard → Service → Manual Deploy

### Netlify
- View build logs: Deploys → Click deployment → Logs
- Check function logs: Functions tab
- Monitor performance: Analytics tab

---

## Cost Optimization

### Render (Free Tier)
- PostgreSQL: Free tier available
- Web service: Sleeps after 15 min of inactivity (paid plans don't)
- **Recommendation**: Upgrade to paid for always-on service ($7+/month)

### Netlify (Free Tier)
- 100 GB/month bandwidth
- Auto HTTPS & continuous deployment
- **Perfect for**: Frontend hosting

### Total Monthly Cost
- **Render Backend**: $7-12/month (with always-on)
- **Netlify Frontend**: Free
- **Total**: ~$7-12/month

---

## Next Steps

1. ✅ Deploy backend to Render
2. ✅ Deploy frontend to Netlify
3. ✅ Test all features
4. ✅ Update portfolio/resume with live URLs
5. ✅ Add to GitHub README
6. ✅ Monitor for errors

---

## Support

For issues:
- Render Support: https://render.com/docs
- Netlify Support: https://docs.netlify.com
- GitHub Issues: Create issue in your repo
