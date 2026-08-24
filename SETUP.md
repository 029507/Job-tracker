# Getting Started

## Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL 14+ (or Docker)
- Git

## Local Development Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd job-tracker
```

### 2. Backend Setup

```bash
cd backend

# Copy environment template
cp .env.example .env

# Install dependencies
npm install

# Create PostgreSQL database
# Make sure PostgreSQL is running on your machine
# Default connection: postgresql://user:password@localhost:5432/jobtracker

# Run migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# Start backend server
npm run dev
```

Backend will run at `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Copy environment template
cp .env.example .env

# Install dependencies
npm install

# Start frontend development server
npm start
```

Frontend will run at `http://localhost:3000`

## Using Docker (Recommended for Quick Start)

### Prerequisites
- Docker
- Docker Compose

### Run with Docker Compose

```bash
# From project root
docker-compose up
```

This will:
- Start PostgreSQL database
- Run backend server at http://localhost:5000
- Run frontend at http://localhost:3000

Access the application at `http://localhost:3000`

### First Time Setup with Docker

```bash
# Run migrations inside the backend container
docker-compose exec backend npx prisma migrate dev --name init
```

## Project Structure

```
job-tracker/
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service layer
│   │   ├── context/          # React Context (Auth)
│   │   ├── App.tsx           # Main app component
│   │   └── index.tsx         # Entry point
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── backend/
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
├── docker-compose.yml
└── README.md
```

## Features Implemented

✅ **User Authentication**
- Register with email, password, and name
- Login with email and password
- JWT-based authentication
- Protected routes

✅ **Application Management**
- Create new job applications
- Edit existing applications
- Delete applications
- Track application status (Applied, Phone Screen, Interview, Offer, Rejected, Withdrawn)
- Add notes and job descriptions

✅ **Search & Filter**
- Search by company name or position
- Filter by application status
- Real-time search results

✅ **Dashboard**
- Overview of all applications
- Quick statistics (total, response rate, success rate)
- Recent applications list
- Quick action buttons

✅ **Analytics**
- Application status distribution (pie chart)
- Applications over time (line chart)
- Detailed statistics breakdown
- Response rate and success rate metrics

✅ **Responsive Design**
- Mobile-friendly interface
- Works on desktop, tablet, and mobile
- Tailwind CSS for modern styling

## API Endpoints

### Authentication
```
POST   /api/auth/register     - Register new user
POST   /api/auth/login        - Login user
```

### Applications
```
GET    /api/applications              - Get all applications (with filters)
GET    /api/applications/:id          - Get single application
POST   /api/applications              - Create application
PUT    /api/applications/:id          - Update application
DELETE /api/applications/:id          - Delete application
```

### Analytics
```
GET    /api/analytics/stats           - Get dashboard statistics
GET    /api/analytics/timeline/monthly - Get monthly timeline data
GET    /api/analytics/distribution/status - Get status distribution
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/jobtracker
JWT_SECRET=your-secret-key-here
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Deployment

### Backend Deployment (Railway/Render)

1. Connect your GitHub repository
2. Set environment variables:
   ```
   DATABASE_URL=<your-postgres-url>
   JWT_SECRET=<secure-random-string>
   ```
3. Build command: `npm run build`
4. Start command: `npm start`

### Frontend Deployment (Vercel/Netlify)

1. Connect your GitHub repository
2. Set environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-url/api
   ```
3. Build command: `npm run build`
4. Deploy the `build` folder

## Testing the Application

### Create Test Account
1. Go to http://localhost:3000
2. Click "Need an account? Sign up"
3. Register with test credentials:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123

### Add Test Applications
1. Click "New Application"
2. Fill in the form:
   - Company: Google
   - Position: Software Engineer
   - Status: APPLIED
3. Click "Save Application"

### View Analytics
1. Go to Dashboard to see quick statistics
2. Go to Analytics to see charts and detailed breakdown

## Troubleshooting

### PostgreSQL Connection Error
- Ensure PostgreSQL is running: `pg_isready`
- Check DATABASE_URL in .env
- Verify credentials match your PostgreSQL setup

### Port Already in Use
- Backend: Change PORT in .env
- Frontend: Kill the process on port 3000 or use `PORT=3001 npm start`

### Prisma Migration Error
- Reset database: `npx prisma migrate reset`
- Generate client: `npx prisma generate`

### CORS Error
- Ensure REACT_APP_API_URL matches backend URL
- Check CORS configuration in backend

## Interview Tips

When presenting this project:

1. **Architecture**: Explain the separation of concerns between frontend and backend
2. **Authentication**: Discuss JWT tokens and secure password handling with bcrypt
3. **Database**: Explain the schema design and relationships
4. **State Management**: Talk about React Context for authentication state
5. **API Design**: RESTful endpoints with proper status codes
6. **Scalability**: Mention how the project could scale (caching, pagination, etc.)
7. **Security**: Password hashing, JWT tokens, CORS configuration
8. **Testing**: Mention you could add unit tests with Jest and integration tests

## Future Enhancements

- [ ] Email notifications for application updates
- [ ] Calendar view for interview dates
- [ ] File upload for cover letters and resume versions
- [ ] Integration with job boards (LinkedIn, Indeed API)
- [ ] Interview preparation notes and resources
- [ ] Salary tracking and negotiation notes
- [ ] Networking contacts tracking
- [ ] Interview scheduling with calendar sync
- [ ] Export applications to CSV/PDF
- [ ] Dark mode toggle

## License

MIT License - feel free to use this for your portfolio!

---

**Happy job hunting! 🚀**

For questions or improvements, feel free to open an issue or submit a pull request.
