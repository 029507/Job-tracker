# 🎯 Job Application Tracker

A full-stack web application to track job applications, interview stages, and provide analytics for job seekers.

## ✨ Features

- **Application Management**: Add, edit, and delete job applications
- **Status Tracking**: Track application stages (Applied, Interview, Offer, Rejected)
- **Analytics Dashboard**: Visualize application statistics and trends
- **Search & Filter**: Find applications by company, position, or status
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Authentication**: Secure user accounts with JWT

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Recharts for data visualization
- React Router for navigation
- Axios for API calls

### Backend
- Node.js + Express
- PostgreSQL database
- Prisma ORM
- JWT authentication
- bcrypt for password hashing

### DevOps
- Docker & Docker Compose
- ESLint + Prettier
- Environment-based configuration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+ (or use Docker)
- npm or yarn

### Installation

1. **Clone and install dependencies**
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

2. **Set up environment variables**

Create `backend/.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/jobtracker"
JWT_SECRET="your-secret-key-change-this"
PORT=5000
```

3. **Initialize database**
```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

4. **Run the application**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

Visit `http://localhost:3000`

### Using Docker (Easier)

```bash
docker-compose up
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
job-tracker/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── context/        # React context (auth)
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   └── package.json
├── backend/                # Express backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth & validation
│   │   ├── prisma/         # Database schema
│   │   └── utils/          # Helper functions
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🎨 Features Demo

### Dashboard
- Overview of all applications
- Quick stats (Total, Pending, Interviews, Offers)
- Recent applications list

### Add Application
- Company name
- Position title
- Job description
- Application date
- Status
- Notes

### Analytics
- Applications over time (line chart)
- Status distribution (pie chart)
- Response rate metrics

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Environment variable configuration
- CORS configuration

## 📝 API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Applications
- `GET /api/applications` - Get all applications
- `GET /api/applications/:id` - Get single application
- `POST /api/applications` - Create application
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application

### Analytics
- `GET /api/analytics/stats` - Get dashboard statistics

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack JavaScript/TypeScript development
- RESTful API design
- Database design and ORM usage
- Authentication & authorization
- React hooks and state management
- Responsive UI design
- Docker containerization
- Git workflow

## 🚀 Deployment

### Backend (Railway/Render)
1. Set environment variables
2. Deploy from GitHub
3. Run migrations

### Frontend (Vercel/Netlify)
1. Set API URL environment variable
2. Deploy from GitHub

## 📄 License

MIT

## 👤 Author

Built as an interview portfolio project demonstrating full-stack development skills.
