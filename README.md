# Hydroid AI

Web security intelligence and analysis platform. Turborepo monorepo with Ts.ED backend, Next.js frontend, and self-hosted vulnerability scanner with LM Studio support.  


## Architecture

```

hydroid-ai/
├── apps/
│   ├── api/          # Ts.ED (Express) Backend + Prisma + SQLite
│   ├── web/          # Next.js 16 Frontend + React 19 + Tailwind v4
│   └── docs/         # Next.js 15 Documentation + MDX
├── packages/
│   ├── security-core/   # Types, HttpClient, shared utilities
│   ├── scanner-web/     # Headers, cookies, CORS, SSL analyzers
│   ├── scanner-sqli/    # SQL injection scanner
│   ├── scanner-xss/     # Reflected XSS scanner
│   ├── ui/              # Shared UI components (Radix + shadcn/ui)
│   ├── eslint-config/   # Shared ESLint config
│   └── typescript-config/ # Shared TypeScript config
└── turbo.json

```



## Tech Stack



### Backend

- **Runtime**: Bun
- **Framework**: Ts.ED v8 (Express)
- **ORM**: Prisma + TypeORM
- **Database**: SQLite
- **Auth**: JWT + bcrypt
- **API Docs**: Swagger via `@tsed/swagger`



### Frontend

- **Framework**: Next.js 16 (App Router)
- **React**: 19
- **Styling**: Tailwind CSS v4 + shadcn/ui (dark/monochrome theme)
- **State**: Zustand
- **Validation**: Zod + react-hook-form
- **Icons**: lucide-react



### Security Scanner

- **Modules**: Headers, Cookies, CORS, SSL, SQLi, XSS
- **Parallelization**: `runWithConcurrency` for HTTP requests
- **LLM**: LM Studio integration for AI analysis of scan results
- **Frontend**: SSE (Server-Sent Events) for real-time progress



## Main Features



### 1. Web Security Scanner

Full scan of a target URL via 6 modules executed in parallel:


| Module            | Description                                                                   |
| ----------------- | ----------------------------------------------------------------------------- |
| **Headers**       | Checks security headers (HSTS, CSP, X-Frame-Options, etc.)                    |
| **Cookies**       | Analyzes cookie security attributes (Secure, HttpOnly, SameSite)              |
| **CORS**          | Checks Cross-Origin Resource Sharing configuration                            |
| **SSL**           | Checks HTTPS and the presence of the HSTS header                              |
| **SQL Injection** | Tests error-based, time-based, union-based, and boolean-based vulnerabilities |
| **XSS**           | Detects reflected XSS vulnerabilities                                         |


**API Endpoints:**

- `POST /api/security/scan` — Full scan with SSE streaming
- `POST /api/security/analyze` — Headers/cookies/CORS/SSL analysis
- `POST /api/security/sqli-test` — Dedicated SQL injection test
- `POST /api/security/full-audit` — Combination of all scans



### 2. AI Analysis of Results

When LM Studio is configured, scan results are sent to a local LLM that generates:

- Risk level summary
- Remediation recommendations
- Identified attack vectors
- Priority actions



### 3. AI Agents & Fine-Tuning

- AI agent configuration and activation
- Fine-tuning job management (Ollama / LM Studio)
- LoRA configuration



### 4. OSINT

- Human search and profiling
- Building intelligence
- Object tracking



## Packages


| Package                      | npm name                     | Description                        |
| ---------------------------- | ---------------------------- | ---------------------------------- |
| `apps/api`                   | `@hydroid/api`               | Ts.ED Backend                      |
| `apps/web`                   | `@hydroid/web`               | Next.js Frontend                   |
| `apps/docs`                  | `@hydroid/docs`              | MDX Documentation                  |
| `packages/security-core`     | `@hydroid/security-core`     | Security types and utilities       |
| `packages/scanner-web`       | `@hydroid/scanner-web`       | Headers/cookies/CORS/SSL analyzers |
| `packages/scanner-sqli`      | `@hydroid/scanner-sqli`      | SQL injection scanner              |
| `packages/scanner-xss`       | `@hydroid/scanner-xss`       | XSS scanner                        |
| `packages/ui`                | `@hydroid/ui`                | Shared UI components               |
| `packages/eslint-config`     | `@hydroid/eslint-config`     | ESLint config                      |
| `packages/typescript-config` | `@hydroid/typescript-config` | TypeScript config                  |




## Commands



### Installation

```bash
bun install

```



### Development

```bash
# Entire monorepo
bun run dev

# Backend only
cd apps/api && bun run dev

# Frontend only
cd apps/web && bun run dev

# Documentation
cd apps/docs && bun run dev

```



### Build

```bash
bun run build

```



### Lint & Format

```bash
bun run lint
bun run format

```



### Database

```bash
cd apps/api
bun run prisma:migrate    # Migration
bun run prisma:generate   # Prisma client generation

```



## API Endpoints



### Users

- `POST /api/users` — Create a user
- `POST /api/users/login` — Login
- `GET /api/users` — List users
- `GET /api/users/:id` — Get a user



### Security

- `POST /api/security/scan` — Full security scan
- `POST /api/security/analyze` — Vulnerability analysis
- `POST /api/security/sqli-test` — SQL injection test
- `POST /api/security/full-audit` — Full audit



### AI Agents

- `POST /api/agents` — Create an agent
- `GET /api/agents` — List agents
- `POST /api/agents/:id/activate` — Activate an agent
- `POST /api/agents/:id/execute` — Execute a task



### Fine-Tuning

- `POST /api/ai-models` — Create an AI model
- `POST /api/fine-tuning` — Create a fine-tuning job
- `POST /api/fine-tuning/:id/start` — Start a job



### Premium Content

- `POST /api/premium/weapons` — Create
- `GET /api/premium/weapons` — List
- `GET /api/premium/weapons/:id` — Get
- `PUT /api/premium/weapons/:id` — Update
- `DELETE /api/premium/weapons/:id` — Delete



## Prerequisites

- Bun >= 1.1
- Node.js >= 18
- LM Studio (optional, for AI analysis)



## License

MIT