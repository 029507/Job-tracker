# 🎯 Job Application Tracker - Deployment Complete! 🚀

A full-stack web application to track job applications, interview stages, and provide analytics for job seekers.

**Status**: ✅ Ready for Production Deployment

---

## 🌐 Live Demo

Once deployed, your application will be accessible at:

- **Frontend**: `https://your-app.netlify.app`
- **Backend API**: `https://your-api.onrender.com`
- **GitHub Repository**: https://github.com/029507/Job-tracker

---

## ✨ Features

- ✅ **Application Management** - Add, edit, delete job applications
- ✅ **Status Tracking** - Track stages: Applied, Phone Screen, Interview, Offer, Rejected, Withdrawn
- ✅ **Analytics Dashboard** - Visualize stats and trends with charts
- ✅ **Search & Filter** - Find apps by company, position, or status
- ✅ **JWT Authentication** - Secure user accounts with tokens
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Docker Support** - Easy local development

---

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS (responsive styling)
- Recharts (data visualization)
- React Router (navigation)
- Axios (API calls)

### Backend
- Node.js + Express
- PostgreSQL + Prisma ORM
- JWT Authentication
- bcryptjs (password hashing)
- CORS enabled for production

### Deployment
- **Backend**: Render (Node.js + PostgreSQL)
- **Frontend**: Netlify (React)
- **Database**: PostgreSQL on Render
- **Version Control**: GitHub

---

## 🚀 Quick Start (Local)

### Prerequisites
- Node.js 18+
- PostgreSQL 14+ (or Docker)
- npm or yarn

### Option 1: Using Docker (Recommended)
```bash
# Clone repository
git clone https://github.com/029507/Job-tracker.git
cd Job-tracker

# Start with Docker Compose
docker-compose up
```

Visit `http://localhost:3000`

### Option 2: Manual Setup
```bash
# Backend
cd backend
cp .env.example .env
npm install
npx prisma migrate dev
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm start
```

---

## 📋 Deployment Instructions

### For Render (Backend) + Netlify (Frontend)

Follow the **QUICK_DEPLOY_CHECKLIST.md** for step-by-step instructions:

1. **Deploy Backend to Render** (5 min)
   - Create PostgreSQL database
   - Deploy Node.js service
   - Set environment variables

2. **Deploy Frontend to Netlify** (3 min)
   - Connect GitHub repository
   - Set React environment variables
   - Auto-deploy on push

3. **Test and Share** (5 min)
   - Verify all features work
   - Share live URL with portfolio

**Total Time: ~15 minutes**

### Detailed Guide
See **DEPLOYMENT_GUIDE.md** for troubleshooting and advanced options.

---

## 🧪 Testing the App

### Create Test Account
1. Register: `john@example.com` / `password123`

### Add Test Application
1. Click "New Application"
2. Fill: Company: "Google", Position: "SWE", Status: "APPLIED"
3. Click "Save"

### View Analytics
1. Go to Dashboard → See stats
2. Go to Analytics → See charts

---

## 📁 Project Structure

```
job-tracker/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service layer
│   │   ├── context/          # React Context (auth)
│   │   └── App.tsx           # Main component
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── backend/                  # Express API
│   ├── src/
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Auth middleware
│   │   ├── index.ts          # Server entry
│   │   └── utils/            # Helpers
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── docker-compose.yml        # Docker setup
├── render.yaml               # Render deployment config
├── netlify.toml              # Netlify deployment config
├── DEPLOYMENT_GUIDE.md       # Detailed deployment steps
├── QUICK_DEPLOY_CHECKLIST.md # Quick reference
└── README.md                 # This file
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register     # Create account
POST   /api/auth/login        # Login user
```

### Applications (Protected)
```
GET    /api/applications              # List all apps
GET    /api/applications/:id          # Get single app
POST   /api/applications              # Create app
PUT    /api/applications/:id          # Update app
DELETE /api/applications/:id          # Delete app
```

### Analytics (Protected)
```
GET    /api/analytics/stats           # Dashboard stats
GET    /api/analytics/timeline        # Monthly timeline
GET    /api/analytics/distribution    # Status breakdown
```

---

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT-based authentication
- ✅ Protected API routes with middleware
- ✅ Environment variable configuration
- ✅ CORS enabled for production domains
- ✅ Input validation on routes

---

## 💰 Deployment Costs

| Service | Free Tier | Cost |
|---------|-----------|------|
| Render Backend | Yes (with sleep) | $7+/month (always-on) |
| Render PostgreSQL | Yes | Free |
| Netlify Frontend | Yes | Free |
| **Total** | **~$0-7/month** | **$7+/month (recommended)** |

---

## 🛠️ Troubleshooting

### Issue: CORS Error
**Solution**: Update `REACT_APP_API_URL` in Netlify to match backend URL

### Issue: Database Connection Error
**Solution**: Verify `DATABASE_URL` in Render settings

### Issue: Build Fails
**Solution**: Check build logs, ensure all dependencies in package.json

### Issue: Login Not Working
**Solution**: Verify backend is running, check JWT_SECRET is set

See **DEPLOYMENT_GUIDE.md** for more solutions.

---

## 📚 Learning Outcomes

This project demonstrates:
- ✅ Full-stack JavaScript/TypeScript development
- ✅ RESTful API design & implementation
- ✅ Database design with Prisma ORM
- ✅ Authentication & authorization (JWT)
- ✅ React hooks & state management
- ✅ Responsive UI with Tailwind CSS
- ✅ Docker containerization
- ✅ Git version control
- ✅ CI/CD with GitHub → Render/Netlify

---

## 🚀 Next Steps

1. ✅ Push code to GitHub (Done)
2. ⏳ Deploy backend to Render (Follow QUICK_DEPLOY_CHECKLIST.md)
3. ⏳ Deploy frontend to Netlify (Follow QUICK_DEPLOY_CHECKLIST.md)
4. ⏳ Test all features on live app
5. ⏳ Add URLs to portfolio/resume
6. ⏳ Monitor performance on dashboards

---

## 📞 Support & Resources

- **Render Docs**: https://render.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Prisma Docs**: https://www.prisma.io/docs
- **Express Docs**: https://expressjs.com
- **React Docs**: https://react.dev

---

## 📄 License

MIT License - Feel free to use for your portfolio!

---

## 👤 About

Built as a full-stack portfolio project demonstrating modern web development practices and deployment workflows.

**GitHub**: https://github.com/029507/Job-tracker

---

## ⭐ If this helps you, please star the repo!

```
git clone https://github.com/029507/Job-tracker.git
cd Job-tracker
# Follow deployment steps in QUICK_DEPLOY_CHECKLIST.md
```

**Happy job hunting! 🎯**
