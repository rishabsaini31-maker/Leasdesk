<!-- Build: 2026-07-24T18:30+05:30 -->

This repo now contains **three completely independent projects** under root-level directories:

| Directory | Port | Purpose |
|-----------|------|---------|
| `frontend/` | 3000 | Public landing page + lead form |
| `admin/` | 3001 | Admin login + dashboard |
| `backend/` | 4000 | Express REST API server |

The old mono Next.js app has been **fully replaced**.

---

## Quick Start

```bash
# Install dependencies for all 3 apps
cd frontend && npm install && cd ..
cd admin && npm install && cd ..
cd backend && npm install && cd ..

# Setup database (SQLite)
cd backend && npm run db:push && npm run db:seed && cd ..

# Run all 3 in parallel
npm install && npm run dev:all

# Or run individually:
cd backend  && npm run dev   # http://localhost:4000
cd frontend && npm run dev   # http://localhost:3000
cd admin    && npm run dev   # http://localhost:3001
```

---

## Backend (Express API Server)

```bash
cd backend
npm install
npm run db:push     # Push Prisma schema to SQLite
npm run db:seed     # Create demo admin (admin@leaddesk.com / Admin@123)
npm run dev         # Express server on :4000
```

**Endpoints:**
- `POST /api/auth/login` — Login, returns JWT
- `GET /api/auth/me` — Verify session (JWT required)
- `POST /api/auth/logout` — Delete JWT cookie
- `GET /api/leads` — List leads, search (?search=) (JWT required)
- `POST /api/leads` — Create lead (rate-limited, no auth)
- `PATCH /api/leads/:id/status` — Update status (JWT required)

**Config:** `.env` with `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CORS_ORIGIN`

---

## Frontend (Next.js Public Page)

```bash
cd frontend
npm install
npm run dev   # http://localhost:3000
```

- Landing page: Hero, Features, Why Us sections
- Lead form: posts to `${NEXT_PUBLIC_API_URL}/api/leads`
- No auth/admin views

**Config:** `.env.local` with `NEXT_PUBLIC_API_URL`

---

## Admin (Next.js Dashboard)

```bash
cd admin
npm install
npm run dev   # http://localhost:3001
```

- Login view → posts to `${NEXT_PUBLIC_API_URL}/api/auth/login`
- Dashboard: stat cards, searchable leads table, status dropdown
- Logout → clears cookie + resets store

**Config:** `.env.local` with `NEXT_PUBLIC_API_URL`

---

## Root package.json Scripts

```bash
npm run dev:backend   # Start backend only
npm run dev:frontend  # Start frontend only  
npm run dev:admin     # Start admin only
npm run dev:all       # Start all 3 with concurrently
npm run db:push       # Push Prisma schema
npm run db:seed       # Seed admin user
```

---

## Caddyfile

Updated reverse proxy routes:
- `/` → `localhost:3000` (Frontend)
- `/admin` → `localhost:3001` (Admin dashboard)
- `?XTransformPort=*` → dynamic port forwarding (WebSocket example)

---

## Admin Credentials

- Email: `admin@leaddesk.com`
- Password: `Admin@123`
