# LeadDesk Mini

> A modern lead management platform built with Next.js, Express, and PostgreSQL.

LeadDesk Mini helps businesses collect, organize, and track customer inquiries through a secure, fast, and modern web application. It provides a public-facing landing page with an inquiry form and a password-protected admin dashboard for managing leads.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Database Setup](#database-setup)
- [Running the Applications](#running-the-applications)
- [API Reference](#api-reference)
- [Authentication](#authentication)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Admin Credentials](#admin-credentials)
- [Troubleshooting](#troubleshooting)

## Features

### Public Frontend
- Responsive landing page with hero, features, and why-us sections
- Inquiry form with validation (name, email, budget range, message)
- Rate-limited form submission with honeypot-style protection
- Smooth animations using Framer Motion
- Mobile-first design with Tailwind CSS

### Admin Dashboard
- Secure login with email and password
- Dashboard overview with stat cards (Total, New, Contacted, Closed leads)
- Searchable and filterable leads table
- Inline status update dropdown (New → Contacted → Closed)
- Detailed lead view modal
- Logout with session cleanup
- Persistent auth across reloads (sessionStorage + bearer token)

### Backend
- RESTful Express API with Prisma ORM
- JWT-based authentication with 7-day expiry
- Rate-limited public lead creation (5 requests/minute)
- CORS configuration for cross-origin Vercel deployments
- Request logging and error handling middleware
- PostgreSQL database via Supabase

## Architecture

This repository contains **three completely independent projects** under root-level directories:

| Directory   | Port | Purpose                           |
|-------------|------|-----------------------------------|
| `frontend/` | 3000 | Public landing page + lead form   |
| `admin/`    | 3001 | Admin login + dashboard           |
| `backend/`  | 4000 | Express REST API server           |

The frontend and admin are both Next.js apps. The backend is a standalone Express application. They communicate over HTTP using the REST API.

## Tech Stack

### Frontend (`frontend/`)
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19, Tailwind CSS 4, shadcn/ui
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React

### Admin (`admin/`)
- **Framework:** Next.js 16 (App Router)
- **State Management:** Zustand (persisted to sessionStorage)
- **UI Library:** React 19, Tailwind CSS 4, shadcn/ui
- **Data Table:** TanStack React Table
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Notifications:** Sonner
- **Forms:** React Hook Form + Zod

### Backend (`backend/`)
- **Runtime:** Node.js (Express 4)
- **Language:** TypeScript (tsx for dev, compiled for prod)
- **ORM:** Prisma 6
- **Database:** PostgreSQL (Supabase)
- **Auth:** JWT (jsonwebtoken) + bcrypt
- **Validation:** Zod
- **CORS:** cors middleware with dynamic origin allowlist
- **Rate Limiting:** express-rate-limit

## Project Structure

```
LeaddeskMini/
├── frontend/                    # Public-facing Next.js app
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   └── landing/
│   │   │       ├── navbar.tsx
│   │   │       ├── hero-section.tsx
│   │   │       ├── features-section.tsx
│   │   │       ├── why-us-section.tsx
│   │   │       ├── cta-section.tsx
│   │   │       ├── lead-form-section.tsx
│   │   │       ├── contact-section.tsx
│   │   │       └── footer.tsx
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   └── types/
│   │       └── lead.ts
│   ├── .env.local
│   ├── next.config.js
│   └── package.json
│
├── admin/                       # Admin dashboard Next.js app
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   ├── ui/             # shadcn/ui components
│   │   │   ├── TopNavbar.tsx
│   │   │   ├── DashboardCard.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── FilterDropdown.tsx
│   │   │   ├── LeadTable.tsx
│   │   │   ├── LeadRow.tsx
│   │   │   ├── LeadRow.tsx
│   │   │   ├── LeadRow.tsx
│   │   │   ├── ViewLeadModal.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── StatusDropdown.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── LoadingSkeleton.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   └── EmptyState.tsx
│   │   ├── stores/
│   │   │   └── auth-store.ts
│   │   ├── lib/
│   │   │   ├── validation.ts
│   │   │   └── utils.ts
│   │   ├── hooks/
│   │   │   ├── use-toast.ts
│   │   │   └── use-mobile.ts
│   │   └── types/
│   │       └── lead.ts
│   ├── .env.local
│   ├── next.config.js
│   ├── tailwind.config.ts
│   └── package.json
│
├── backend/                     # Express API server
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   └── leads.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── cors.ts
│   │   │   └── rateLimit.ts
│   │   ├── lib/
│   │   │   ├── auth.ts
│   │   │   ├── config.ts
│   │   │   ├── db.ts
│   │   │   ├── seed.ts
│   │   │   └── validation.ts
│   │   └── api/
│   │       └── index.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── .env
│   ├── vercel.json
│   └── package.json
│
├── Caddyfile                    # Caddy reverse proxy config
├── package.json                 # Root scripts (concurrently)
└── README.md
```

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- PostgreSQL database (we use Supabase for production)

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd leaddesk-mini

# 2. Install dependencies for all apps
npm run install:all

# Or install individually:
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
cd admin && npm install && cd ..
```

## Database Setup

The backend uses Prisma ORM with PostgreSQL.

```bash
cd backend

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed the admin user
npm run db:seed
```

After seeding, the admin user is created with credentials from `backend/.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`).

## Running the Applications

### Local Development

Run all three apps in parallel:
```bash
npm run dev:all
```

Or run individually:
```bash
cd backend  && npm run dev   # http://localhost:4000
cd frontend && npm run dev   # http://localhost:3000
cd admin    && npm run dev   # http://localhost:3001
```

### Production Build

```bash
# Backend
cd backend && npm run build && npm start

# Frontend
cd frontend && npm run build && npm start

# Admin
cd admin && npm run build && npm start
```

## API Reference

### Authentication Endpoints

| Method | Endpoint               | Auth | Description                          |
|--------|------------------------|------|--------------------------------------|
| POST   | `/api/auth/login`      | No   | Login with email and password        |
| POST   | `/api/auth/logout`     | Yes  | Logout and invalidate session        |
| GET    | `/api/auth/me`         | Yes  | Get current authenticated admin      |

### Lead Endpoints

| Method | Endpoint              | Auth | Description                          |
|--------|-----------------------|------|--------------------------------------|
| GET    | `/api/leads`          | Yes  | List all leads (supports `?search=`) |
| POST   | `/api/leads`          | No   | Create a new lead                    |
| PATCH  | `/api/leads/:id/status` | Yes | Update lead status                   |

**Rate Limiting:** Public lead creation (`POST /api/leads`) is rate-limited to **5 requests per minute**.

### Example Requests

**Login:**
```bash
curl -X POST https://leasdesk-backend.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"rishabsainiupw3112@gmail.com","password":"RSS@3112"}'
```

**List Leads (authenticated):**
```bash
curl https://leasdesk-backend.vercel.app/api/leads \
  -H "Authorization: Bearer <token>"
```

## Authentication

The admin app uses **JWT (JSON Web Token)** authentication:

1. **Login** — User submits credentials to `/api/auth/login`
2. **Token Issuance** — Backend validates credentials and returns a JWT in the response body
3. **Token Storage** — Admin app stores the JWT in `sessionStorage` via Zustand persist
4. **Authenticated Requests** — All subsequent API calls include `Authorization: Bearer <token>` header
5. **Session Validation** — On page load, the admin app calls `/api/auth/me` to verify the token is still valid
6. **Logout** — Clears local token and optionally calls `/api/auth/logout`

Token expiry: **7 days**

## Environment Variables

### Backend (`backend/.env`)
| Variable         | Description                          | Required |
|------------------|--------------------------------------|----------|
| `DATABASE_URL`   | PostgreSQL connection string         | Yes      |
| `JWT_SECRET`     | Secret key for signing JWTs          | Yes      |
| `ADMIN_EMAIL`    | Admin login email                    | Yes      |
| `ADMIN_PASSWORD` | Admin login password                 | Yes      |
| `CORS_ORIGIN`    | Allowed frontend origins (comma-sep) | No       |
| `PORT`           | Server port                          | No       |

### Frontend (`frontend/.env.local`)
| Variable               | Description                | Required |
|------------------------|----------------------------|----------|
| `NEXT_PUBLIC_API_URL`  | Backend API base URL       | Yes      |

### Admin (`admin/.env.local`)
| Variable               | Description                | Required |
|------------------------|----------------------------|----------|
| `NEXT_PUBLIC_API_URL`  | Backend API base URL       | Yes      |

## Deployment

### Vercel

The three apps are deployed as separate projects on Vercel:

- **Frontend:** `https://leasdesk-admin1.vercel.app` (public site)
- **Admin:** `https://leasdesk-admin1.vercel.app` (admin dashboard)
- **Backend:** `https://leasdesk-backend.vercel.app` (API server)

**Backend Vercel Config:**
- `vercel.json` rewrites all requests to `/api/index` (Express serverless entrypoint)
- Build command: `prisma generate && tsc`
- Output directory: `dist`

**CORS Configuration:**
The backend dynamically allows origins in production:
- Exact matches from `CORS_ORIGIN` env var
- Any `*.vercel.app` origin
- All localhost origins in development

### Reverse Proxy (Caddy)

A `Caddyfile` is included for local reverse proxying:
```bash
:81 {
    # /admin → admin dashboard on :3001
    # / → frontend on :3000
    # ?XTransformPort=* → dynamic port forwarding
}
```

Run with: `caddy run --config Caddyfile`

## Admin Credentials

- **Email:** `rishabsainiupw3112@gmail.com`
- **Password:** `RSS@3112`

(These are set in `backend/.env` and seeded via `npm run db:seed`)

## Troubleshooting

### Auto-logout after login
This was caused by cross-origin cookie restrictions between Vercel deployments. Fixed by switching to header-based JWT authentication. Ensure:
1. `NEXT_PUBLIC_API_URL` is set correctly in Vercel's Environment Variables for admin/frontend
2. `JWT_SECRET` and `DATABASE_URL` are set in Vercel for backend
3. Redeploy after changing any Environment Variables

### Dropdown not visible in table
Fixed by rendering dropdown menus through `createPortal` to `document.body` and simplifying animation classes. If issues persist, check browser console for JavaScript errors.

### Backend 500 on Vercel
Common causes:
- Missing `JWT_SECRET` environment variable
- Missing or inaccessible `DATABASE_URL`
- Prisma binary mismatch (fixed by setting `binaryTargets` in `schema.prisma`)

### Database connection issues
- Verify the Supabase pooler URL format: `postgresql://...:6543/postgres?pgbouncer=true`
- Ensure the IP allowlist in Supabase includes Vercel's egress IPs if using connection pooling

## License

Private — Not licensed for redistribution.
