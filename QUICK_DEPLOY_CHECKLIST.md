# 🚀 Quick Deployment Checklist

Follow these steps to deploy your Job Tracker to Render and Netlify.

## Step 1: Deploy Backend to Render ⚙️

### 1.1 Create Render Account
- [ ] Go to https://render.com
- [ ] Sign up with GitHub
- [ ] Authorize Render access

### 1.2 Create PostgreSQL Database
- [ ] Click "New +" → "PostgreSQL"
- [ ] Name: `job-tracker-db`
- [ ] Database: `jobtracker`
- [ ] Copy the **Internal Database URL**

### 1.3 Deploy Backend Service
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repo: `029507/Job-tracker`
- [ ] Name: `job-tracker-api`
- [ ] Build Command: `cd backend && npm install && npx prisma generate && npm run build`
- [ ] Start Command: `cd backend && npx prisma migrate deploy && npm start`
- [ ] Add Environment Variables:
  - `DATABASE_URL`: (paste from 1.2)
  - `JWT_SECRET`: (generate a strong key)
  - `NODE_ENV`: `production`
  - `PORT`: `10000`
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (5-10 minutes)
- [ ] Copy your Backend URL: `https://job-tracker-api.onrender.com`

### 1.4 Verify Backend
- [ ] Visit `https://your-backend-url/health`
- [ ] Should see: `{"status":"ok","timestamp":"..."}`

---

## Step 2: Deploy Frontend to Netlify 🎨

### 2.1 Create Netlify Account
- [ ] Go to https://netlify.com
- [ ] Sign up with GitHub
- [ ] Authorize Netlify access

### 2.2 Deploy Frontend
- [ ] Click "Add new site" → "Import an existing project"
- [ ] Select GitHub → `029507/Job-tracker`
- [ ] Base directory: `frontend`
- [ ] Build command: `npm run build`
- [ ] Publish directory: `frontend/build`
- [ ] Click "Deploy site"
- [ ] Wait for deployment (3-5 minutes)

### 2.3 Set Environment Variables
- [ ] Go to Site settings → Build & deploy → Environment
- [ ] Click "Edit variables"
- [ ] Add: `REACT_APP_API_URL`: `https://job-tracker-api.onrender.com/api`
- [ ] Click "Save"

### 2.4 Trigger New Deploy
- [ ] Go to Deploys → Trigger deploy → Deploy site
- [ ] Wait for deployment to complete
- [ ] Copy your Frontend URL: `https://job-tracker-xyz.netlify.app`

### 2.5 Verify Frontend
- [ ] Visit your Netlify frontend URL
- [ ] Test login/registration
- [ ] Check browser console for errors

---

## Step 3: Final Testing ✅

### Test Authentication
- [ ] Register new account
- [ ] Login with credentials
- [ ] Logout

### Test Job Applications
- [ ] Create new application
- [ ] Edit application
- [ ] Delete application
- [ ] Search/filter applications

### Test Analytics
- [ ] View Dashboard (stats)
- [ ] View Analytics (charts)
- [ ] Check data accuracy

### Test Responsiveness
- [ ] View on desktop
- [ ] View on tablet
- [ ] View on mobile

---

## Step 4: Share Your Live App 📢

Update these URLs in your portfolio:

```
Frontend: https://your-netlify-url.netlify.app
Backend API: https://your-render-url.onrender.com
GitHub: https://github.com/029507/Job-tracker
```

---

## Troubleshooting

### Backend won't deploy
- [ ] Check Render logs for build errors
- [ ] Ensure DATABASE_URL is set correctly
- [ ] Try manual redeploy: Dashboard → Manual Deploy

### Frontend shows API errors
- [ ] Verify REACT_APP_API_URL in Netlify matches backend URL
- [ ] Check browser console for CORS errors
- [ ] Clear cache and redeploy: Deploys → Trigger deploy

### Database connection fails
- [ ] Verify DATABASE_URL is correct
- [ ] Check if PostgreSQL is running in Render
- [ ] Run migrations: Shell → `npx prisma migrate deploy`

### Build fails
- [ ] Check build logs in Render/Netlify
- [ ] Ensure all dependencies are in package.json
- [ ] Try clearing cache and redeploying

---

## Next Steps

- ✅ Deployment complete!
- 📝 Add live URLs to README.md
- 🎯 Add to portfolio/resume
- 🔒 Update JWT_SECRET with a strong random key
- 📊 Monitor performance in Render/Netlify dashboards
- 🐛 Set up error monitoring (optional: Sentry)

---

## Support Resources

- **Render Documentation**: https://render.com/docs
- **Netlify Documentation**: https://docs.netlify.com
- **Common Issues**: See DEPLOYMENT_GUIDE.md for detailed troubleshooting
