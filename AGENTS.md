# AGENTS.md - Agentic Coding Guidelines

## Overview

Hydroid AI is a monorepo containing:

- **apps/api**: Ts.ED backend with TypeORM and SQLite
- **apps/web**: Next.js 15 frontend with React 19
- **apps/docs**: Next.js documentation site
- **packages/ui**: Shared UI component library
- **packages/eslint-config**: ESLint configuration
- **packages/typescript-config**: TypeScript configuration

## Build, Lint, and Test Commands

### Root Commands (Turbo)

```bash
bun run build     # Build all apps
bun run dev       # Run all apps in development
bun run lint      # Lint all apps
bun run format    # Format code with Prettier
```

### Individual App Commands

#### API (apps/api)

```bash
cd apps/api
bun run dev              # Development with watch mode
bun run build            # Build to dist/index.js
bun run barrels          # Generate barrel imports
bun run prisma:migrate   # Run Prisma migrations
bun run prisma:generate  # Generate Prisma client
bun run start:prod       # Production start
```

#### Web (apps/web)

```bash
cd apps/web
bun run dev     # Next.js dev with Turbopack
bun run build   # Next.js production build
bun run start   # Start production server
```

### Running a Single Test

This project currently has no test suite. To add tests:

```bash
# Install vitest
bun add -D vitest

# Run all tests
bun vitest run

# Run specific test file
bun vitest run src/services/userService.test.ts

# Run tests in watch mode
bun vitest
```

## Code Style Guidelines

### TypeScript Configuration

Strict TypeScript settings from `packages/typescript-config/base.json`:

- `strict: true`, `noUncheckedIndexedAccess: true`
- `experimentalDecorators: true`, `emitDecoratorMetadata: true` (for Ts.ED)
- `moduleResolution: NodeNext`, `module: NodeNext`

### Imports

**ESM with `.js` extension for local files:**

```typescript
import { User } from "../entities/User.js";
import { UserRepository } from "../repositories/UsersRepository.js";

# External imports - no extension needed
import { Controller, Inject } from "@tsed/di";
import { Column, Entity } from "typeorm";
```

**Path aliases:**

```typescript
# Within apps, use relative paths
import { UserCreateDto } from "src/validators/UserDto";

# Web app can use @repo/ui
import { Button, Card } from "@repo/ui/components/ui/button";
```

### Naming Conventions

| Element    | Convention       | Example               |
| ---------- | ---------------- | --------------------- |
| Files      | kebab-case       | `user-service.ts`     |
| Classes    | PascalCase       | `UserService`         |
| Interfaces | PascalCase       | `UserDto`             |
| Enums      | PascalCase       | `Role`, `AgentStatus` |
| Methods    | camelCase        | `findByEmail()`       |
| Variables  | camelCase        | `existUser`           |
| Constants  | UPPER_SNAKE_CASE | `USER_REPOSITORY`     |

### Entity Pattern (TypeORM + Ts.ED)

```typescript
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Property, Required } from "@tsed/schema";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid") @Property() id!: string;
  @Column({ unique: true }) @Required() @Property() email!: string;
  @Column({ nullable: true }) @Property() name?: string;
  @CreateDateColumn() @Property() createdAt!: Date;
  @UpdateDateColumn() @Property() updatedAt!: Date;
}
```

### Repository Pattern

```typescript
import { Injectable } from "@tsed/di";
import { AppDataSource } from "../datasources/AppDataSource.js";
import { User } from "../entities/User.js";

export const UserRepository = AppDataSource.getRepository(User).extend({
  findByEmail(email: string) {
    return this.findOne({ where: { email } });
  },
});

@Injectable()
export class UsersRepository {
  get repository() {
    return UserRepository;
  }
  async findAll(): Promise<User[]> {
    return this.repository.find();
  }
  async create(user: Partial<User>): Promise<User> {
    return this.repository.save(this.repository.create(user));
  }
}
```

### Controller Pattern

```typescript
import { Controller, Inject } from "@tsed/di";
import { BodyParams } from "@tsed/platform-params";
import { Get, Post, Returns, Summary } from "@tsed/schema";
import { UserService } from "src/services/UserService";

@Controller("/users")
export class UserController {
  constructor(@Inject() protected service: UserService) {}

  @Post("/register")
  @Summary("Create a new user")
  @Returns(201, User)
  async signupUser(@BodyParams() user: UserCreateDto): Promise<User> {
    return this.service.register(user);
  }
}
```

### Service Pattern

```typescript
import { Injectable } from "@tsed/di";
import { BadRequest } from "@tsed/exceptions";
import { UsersRepository } from "../repositories/UsersRepository.js";

@Injectable()
export class UserService extends UsersRepository {
  async register(data: {
    email: string;
    name?: string;
    password?: string;
  }): Promise<User> {
    const existUser = await this.findByEmail(data.email);
    if (existUser) throw new BadRequest("User already exists");
    return this.create(data);
  }
}
```

### Error Handling

- Use `@tsed/exceptions` for HTTP errors: `BadRequest`, `NotFound`, `Unauthorized`, `Forbidden`
- Return meaningful error messages
- Use Zod for frontend validation

```typescript
import { BadRequest } from "@tsed/exceptions";
throw new BadRequest("User already exists");
```

### DTO/Validation Pattern

```typescript
import { Property, Required, Email, MinLength } from "@tsed/schema";

export class UserCreateDto {
  @Required() @Email() @Property() email!: string;
  @Required() @MinLength(6) @Property() password!: string;
  @Property() name?: string;
}
```

### React/Next.js Patterns

**Client Components:** Add `"use client"` at the top

**Server Components:** Default, no directive needed

```typescript
"use client";
import { Button } from "@repo/ui/components/ui/button";
import { useState } from "react";

export default function Page() {
  const [state, setState] = useState(false);
  return <Button onClick={() => setState(!state)}>Click</Button>;
}
```

### Styling

- Use Tailwind CSS via `@repo/ui`
- Use `clsx` and `tailwind-merge` for conditional classes
- **Current Theme: Dark monochrome (no colors)** - Use gray scale only
- Backgrounds: `bg-black`, `bg-gray-900`, `bg-gray-950`
- Text: `text-gray-100`, `text-gray-400`, `text-gray-500`
- Buttons: `bg-gray-700`, `bg-gray-100` (inverted for contrast)
- Borders: `border-gray-800`, `border-gray-700`

```typescript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}
```

### Dashboard Sidebar Structure

```
Sidebar Navigation (apps/web/components/layout/dashboard-sidebar.tsx):
- Tableau de bord (/dashboard)
- OSINT (/dashboard/osint)
- Scraping (/dashboard/scraping)
- AI Hub (with submenu: Agents, Fine-Tuning)
- Configuration
- Modèles IA
```

### Architecture Summary

```
apps/api/src/
├── controllers/   # Route handlers
├── services/      # Business logic
├── repositories/  # Data access
├── entities/      # TypeORM models
├── validators/   # DTOs
├── tools/         # Skills (LLM, Scrapping, OSINT)
└── datasources/   # Database connection

apps/web/app/
├── (authentification)/  # Login, register
├── (dashboard)/          # Protected routes
│   ├── dashboard/        # Main dashboard
│   ├── osint/            # OSINT search
│   ├── scraping/         # Web scraping
│   └── ai-hub/           # AI agents
└── layout.tsx
```

### Skills / Tools (API)

The API uses skills for AI operations:

```typescript
// LLM Skill (supports ollama or lmstudio)
const llm = new LLMSkill({
  provider: "lmstudio",
  model: "qwen/qwen3-8b",
  baseUrl: "http://localhost:1234/v1",
});
await llm.generate("prompt");

// Scraping Skill
const scraper = new ScrapingSkill({ enabled: true, timeout: 30000 });
const data = await scraper.scrape({ url: "https://example.com" });

// OSINT Skill (uses ScrapingSkill internally)
const osint = new OsintSkill(scraper, { enabled: true });
const result = await osint.search({ target: "John Doe", type: "person" });
```

### Best Practices

1. Always use TypeScript strict mode
2. Import local files with `.js` extension
3. Use repository pattern for data access
4. Use services for business logic, controllers only for routing
5. Handle errors with proper HTTP exceptions
6. Run `bun run format` before commits
7. Run `bun run lint` to check for issues
8. Use `@tsed/schema` decorators for validation
9. Follow dark monochrome theme (no colored gradients)
10. Keep UI minimal - avoid unnecessary cards and decorations
