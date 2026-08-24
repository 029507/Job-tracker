# 📱 Job Application Tracker - Quick Visual Guide

## 🎬 How It Works (Simple Version)

### The Big Picture
You have a web app where job seekers can:
1. **Sign Up** → Create an account
2. **Add Applications** → Track companies they applied to
3. **Update Status** → Mark progress (Applied → Interview → Offer)
4. **View Analytics** → See charts and stats about their job search

---

## 🔄 A Day in the Life

### Morning: User Logs In
```
┌─────────────────┐
│   Browser       │
│                 │
│ Email: john@... │─────┐
│ Password: ****  │     │
│ [Login]         │     │ Sends credentials to backend
└─────────────────┘     │
                        ▼
                   ┌──────────────┐
                   │ Backend      │
                   │              │
                   │ ✓ Verify     │
                   │ ✓ Hash match │
                   │ ✓ Create JWT │
                   └──────────────┘
                        │
                        │ Returns: token + user info
                        ▼
                   ┌─────────────────┐
                   │ Dashboard       │
                   │ Welcome, John!  │
                   │                 │
                   │ Total Apps: 5   │
                   │ Interviews: 2   │
                   └─────────────────┘
```

### Midday: User Adds an Application
```
┌──────────────────┐
│  Applications    │
│  Page            │
│                  │
│ [+ New App]      │◄─── Click
└────────┬─────────┘
         │
         ▼
┌──────────────────────┐
│ Form appears:        │
│                      │
│ Company: Google      │
│ Position: SWE        │
│ Status: APPLIED      │
│                      │
│ [Save Application]   │
└────────┬─────────────┘
         │
         │ POST /api/applications
         │ { company: "Google", position: "SWE", ... }
         │
         ▼
    ┌─────────────┐
    │  Backend    │
    │             │
    │ 1. Get user │
    │    from JWT │
    │ 2. Validate │
    │ 3. Save to  │
    │    database │
    │ 4. Return   │
    │    new app  │
    └─────────────┘
         │
         │ { id: "app-001", company: "Google", ... }
         │
         ▼
    ┌──────────────────┐
    │ Application List │
    │                  │
    │ Google - SWE     │ ◄─── Added!
    │ [Edit] [Delete]  │
    └──────────────────┘
```

### Afternoon: User Updates Status
```
Initial State:
┌─────────────────────┐
│ Google - SWE        │
│ Status: APPLIED     │
│ [Edit]              │
└─────────────────────┘
         │
         │ Click Edit
         ▼
┌─────────────────────┐
│ Status: APPLIED ▼   │
│ Select: INTERVIEW   │
│ [Save]              │
└─────────────────────┘
         │
         │ PUT /api/applications/app-001
         │ { status: "INTERVIEW" }
         │
         ▼
    ┌──────────────┐
    │  Database    │
    │              │
    │ UPDATE app   │
    │ SET status = │
    │ 'INTERVIEW'  │
    └──────────────┘
         │
         │ Success!
         ▼
Final State:
┌─────────────────────┐
│ Google - SWE        │
│ Status: INTERVIEW   │ ◄─── Updated!
│ [Edit]              │
└─────────────────────┘
```

### Evening: User Views Analytics
```
┌─────────────────────┐
│ Click Analytics     │
└──────────┬──────────┘
           │
           │ GET /api/analytics/stats
           │
           ▼
    ┌──────────────────┐
    │ Backend          │
    │                  │
    │ Query database:  │
    │ - Count total    │
    │ - Count by       │
    │   status         │
    │ - Calculate %    │
    │ - Return stats   │
    └──────────────────┘
           │
           │ { total: 5, applied: 2, interview: 2, offer: 1, ... }
           │
           ▼
    ┌──────────────────────────┐
    │  Analytics Dashboard     │
    │                          │
    │ Total: 5                 │
    │ Response Rate: 60%       │
    │ Success Rate: 20%        │
    │                          │
    │  [Pie Chart]             │
    │   ████ Applied (2)       │
    │   ████ Interview (2)     │
    │   ██ Offer (1)           │
    │                          │
    │  [Line Chart]            │
    │    📈 Applications over  │
    │       time               │
    └──────────────────────────┘
```

---

## 🗂️ Behind the Scenes: Database

When user adds an application, here's what happens in the database:

```
BEFORE:
┌─────────────────────────────────┐
│ User Table                      │
├─────────────────────────────────┤
│ id: "user-123"                  │
│ email: "john@example.com"       │
│ name: "John Doe"                │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Application Table               │
├─────────────────────────────────┤
│ (empty - no apps yet)           │
└─────────────────────────────────┘

AFTER adding Google + Microsoft:
┌─────────────────────────────────┐
│ User Table                      │
├─────────────────────────────────┤
│ id: "user-123"                  │
│ email: "john@example.com"       │
│ name: "John Doe"                │
└─────────────────────────────────┘

┌──────────────────────────────────────┐
│ Application Table                    │
├──────────────────────────────────────┤
│ id: "app-001"                        │
│ userId: "user-123" (links to user)   │
│ company: "Google"                    │
│ position: "SWE"                      │
│ status: "APPLIED"                    │
│ appliedDate: "2026-08-24"            │
├──────────────────────────────────────┤
│ id: "app-002"                        │
│ userId: "user-123"                   │
│ company: "Microsoft"                 │
│ position: "Backend Dev"              │
│ status: "INTERVIEW"                  │
│ appliedDate: "2026-08-23"            │
└──────────────────────────────────────┘
```

---

## 🔐 Security: How JWT Works

```
┌─────────────────────────────────────────────────────────┐
│                   JWT Security                          │
└─────────────────────────────────────────────────────────┘

1. LOGIN
   ┌──────────────────┐
   │ User enters:     │
   │ email + password │
   └────────┬─────────┘
            │
            ▼
   ┌──────────────────────────┐
   │ Backend verifies password│
   │ Matches bcrypt hash?     │
   │ YES ✓                    │
   └────────┬─────────────────┘
            │
            │ Create JWT token:
            │ { userId: "123", email: "john@..." }
            │ Signed with SECRET key
            │
            ▼
   ┌──────────────────────────┐
   │ Send token to frontend:  │
   │ "eyJhbGciOiJIUzI..."     │
   └──────────────────────────┘

2. STORE TOKEN
   ┌──────────────────────────┐
   │ Frontend localStorage:   │
   │ token = "eyJhbGciOiJIUzI"│
   └──────────────────────────┘

3. USE TOKEN FOR REQUESTS
   ┌──────────────────────────────────────┐
   │ GET /api/applications                │
   │ Headers:                             │
   │ Authorization: Bearer eyJhbGciOiJIUzI│
   └────────┬─────────────────────────────┘
            │
            ▼
   ┌──────────────────────────────────────┐
   │ Backend receives request             │
   │ 1. Extract token from header         │
   │ 2. Verify signature with SECRET      │
   │ 3. Valid? ✓ YES                      │
   │ 4. Extract userId from token         │
   │ 5. Query: WHERE userId = token.id    │
   │ 6. Return only THEIR apps            │
   └──────────────────────────────────────┘

4. INVALID TOKEN
   ┌──────────────────────────────────────┐
   │ Request without token or expired:    │
   │                                      │
   │ Backend returns: 401 Unauthorized    │
   │                                      │
   │ Frontend redirects: /login           │
   └──────────────────────────────────────┘
```

---

## 📊 Analytics Calculation

```
User has these applications:
┌──────────┬──────────┬──────────┐
│ Google   │ Microsoft│ Apple    │
│ APPLIED  │INTERVIEW │ INTERVIEW│
└──────────┴──────────┴──────────┘

┌─────────────────────────────┐
│ IBM      │ Amazon           │
│ OFFER    │ REJECTED         │
└─────────┴──────────────────┘

Total: 5 applications

Status Breakdown:
- APPLIED: 1 (Google)
- INTERVIEW: 2 (Microsoft, Apple)
- OFFER: 1 (IBM)
- REJECTED: 1 (Amazon)

Metrics:
Response Rate = (Total - Still Waiting) / Total
              = (5 - 1) / 5 × 100
              = 80%
              (4 out of 5 got past initial apply)

Success Rate = Got Offers / Total
             = 1 / 5 × 100
             = 20%
             (1 out of 5 got an offer)

Charts:
Pie Chart:
████████████ APPLIED (1)
████████████████ INTERVIEW (2)
████████ OFFER (1)
████████ REJECTED (1)

Line Chart (over time):
Aug 20: 1 app
Aug 21: 2 apps
Aug 22: 3 apps
Aug 23: 4 apps
Aug 24: 5 apps
```

---

## 🛠️ Tech Stack Explained Simply

```
FRONTEND (What the user sees)
├── React
│   └─ Components that display:
│      - Login form
│      - Dashboard
│      - Application list
│      - Charts
│
├── TypeScript
│   └─ Makes sure data types are correct
│
├── Tailwind CSS
│   └─ Pretty styling (buttons, colors, layouts)
│
└── Recharts
    └─ Charts and graphs

BACKEND (The server)
├── Node.js / Express
│   └─ Handles HTTP requests:
│      - POST /api/auth/login
│      - GET /api/applications
│      - POST /api/applications
│      etc.
│
├── TypeScript
│   └─ Type safety for the backend too
│
└── Prisma ORM
    └─ Easy database queries

DATABASE (Where data lives)
└── SQLite
    └─ Local database file (dev.db)
       Contains:
       - Users table
       - Applications table
```

---

## ✅ What This Project Shows Employers

| Skill | How It Shows |
|-------|-------------|
| **Full-Stack** | Frontend + Backend + Database |
| **Frontend** | React, TypeScript, UI Design |
| **Backend** | Node.js, REST APIs, Authentication |
| **Database** | Schema design, queries, relationships |
| **Security** | Password hashing, JWT tokens, CORS |
| **Problem Solving** | Real app solving real problem |
| **Code Quality** | Clean structure, separation of concerns |
| **DevOps** | Docker, environment config |

---

## 🚀 Running the Project

```bash
# Backend (Terminal 1)
cd backend
npm install
npm run dev
# Runs on http://localhost:5000

# Frontend (Terminal 2)
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

Then:
1. Go to http://localhost:3000
2. Sign up with test credentials
3. Add some applications
4. Watch the analytics update in real-time!

---

This entire flow demonstrates **production-ready full-stack development**! 🎉
