# Hydroid AI - Project Documentation

## Overview

**Hydroid AI** is a comprehensive intelligence and data analysis platform designed for OSINT (Open Source Intelligence), web scraping, data analysis, and AI-powered content generation.

## Architecture

### Backend (Ts.ED + Prisma + SQLite)

- **Framework**: Ts.ED v8 (Node.js/Bun)
- **ORM**: Prisma + TypeORM
- **Database**: SQLite
- **AI Integration**: Ollama + LM Studio

### Frontend (Next.js)

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **State Management**: Zustand
- **Validation**: Zod + react-hook-form

## Core Features

### 1. Security Scanner

Web security scanner with 6 parallel modules:

- **Security Headers** — HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Cookie Analysis** — Secure, HttpOnly, SameSite attributes
- **CORS Configuration** — Cross-origin resource sharing analysis
- **SSL/TLS** — HTTPS verification and HSTS header check
- **SQL Injection** — Error-based, time-based, union-based, and boolean-based detection with baseline comparison
- **XSS Detection** — Reflected XSS via payload reflection analysis

LLM-powered analysis via LM Studio for risk summary and remediation recommendations.

### 2. AI Agents & Fine-Tuning

- Agent configuration and task execution
- Fine-tuning job management (Ollama / LM Studio)
- LoRA configuration

### 3. OSINT Operations

- Human profiling
- Building intelligence
- Object tracking

## API Endpoints

### Security

- `POST /api/security/scan` — Full security scan with SSE streaming
- `POST /api/security/analyze` — Headers, cookies, CORS, SSL analysis
- `POST /api/security/sqli-test` — SQL injection testing
- `POST /api/security/full-audit` — Combined security audit

### Users

- `POST /api/users` - Create user
- `POST /api/users/login` - Login
- `GET /api/users` - List users
- `GET /api/users/:id` - Get user by ID

### AI Agents

- `POST /api/agents` - Create agent
- `GET /api/agents` - List agents
- `POST /api/agents/:id/activate` - Activate
- `POST /api/agents/:id/execute` - Execute task

### Fine-Tuning

- `POST /api/ai-models` - Create model
- `POST /api/fine-tuning` - Create job
- `POST /api/fine-tuning/:id/start` - Start job

### Premium Content

- `POST /api/premium/weapons` - Create
- `GET /api/premium/weapons` - List
- `GET /api/premium/weapons/:id` - Get
- `PUT /api/premium/weapons/:id` - Update
- `DELETE /api/premium/weapons/:id` - Delete

## Technology Stack

### Backend

- Bun runtime
- Ts.ED v8 framework
- Prisma + TypeORM
- SQLite
- JWT authentication
- Ollama SDK + LM Studio integration

### Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Zustand
- Zod validation

### Security Packages

- `@hydroid/security-core` — Shared types, HTTP client, utilities
- `@hydroid/scanner-web` — Header, Cookie, CORS, SSL analyzers
- `@hydroid/scanner-sqli` — SQL injection scanner
- `@hydroid/scanner-xss` — XSS scanner

## Getting Started

### Prerequisites

- Bun >= 1.1
- Node.js >= 18+
- LM Studio (optional, for AI analysis)

### Installation

```bash
bun install
```

### Running the Application

```bash
# Backend
cd apps/api
bun run dev

# Frontend
cd apps/web
bun run dev

# Documentation
cd apps/docs
bun run dev
```

### Database

```bash
cd apps/api
bun run prisma:migrate
bun run prisma:generate
```

## Project Structure

```
apps/api/src/
├── controllers/     # API route controllers
├── services/        # Business logic
├── entities/        # Database entities (Prisma)
├── tools/           # WebScanner, LLM, VulnerabilityAnalyzer
├── factories/       # SkillFactory
└── datasources/     # Database configuration

apps/web/
├── app/             # Next.js App Router pages
├── components/      # React components
│   ├── security/    # Scanner UI components
│   └── ui/          # Shared UI components
├── store/           # Zustand stores
└── services/        # API client functions
```

## License

MIT
