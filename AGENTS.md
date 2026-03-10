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
# Build all apps
bun run build

# Run all apps in development mode
bun run dev

# Lint all apps
bun run lint

# Format code (Prettier)
bun run format
```

### Individual App Commands

#### API (apps/api)

```bash
cd apps/api
bun run dev          # Development with watch mode
bun run build        # Build to dist/index.js
bun run barrels      # Generate barrel imports
bun run prisma:migrate  # Run Prisma migrations
bun run prisma:generate # Generate Prisma client
bun run start:prod   # Production start
```

#### Web (apps/web)

```bash
cd apps/web
bun run dev          # Next.js dev with Turbopack
bun run build       # Next.js production build
bun run start       # Start production server
bun run lint        # ESLint
```

### Running a Single Test

This project currently has no test suite. To add tests, use:

```bash
# For API - install vitest or jest
bun add -D vitest
bun vitest run

# For Web - Next.js uses jest or vitest
```

## Code Style Guidelines

### TypeScript Configuration

The project uses strict TypeScript with these settings (from `packages/typescript-config/base.json`):

- `strict: true`
- `noUncheckedIndexedAccess: true`
- `experimentalDecorators: true` (for Ts.ED)
- `emitDecoratorMetadata: true` (for Ts.ED)
- `moduleResolution: NodeNext`
- `module: NodeNext`

### Imports

**ESM with `.js` extensions:**

```typescript
// Local imports must include .js extension
import { User } from "../entities/User.js";
import { UsersRepository } from "../repositories/UsersRepository.js";

// External imports - no extension needed
import { Controller, Inject } from "@tsed/di";
import { Column, Entity } from "typeorm";
```

**Path aliases:**

```typescript
// Use relative paths within apps
import { UserCreateDto } from "src/validators/UserDto";

// Web app can use @repo/ui for shared components
import { Button, Card } from "@repo/ui/components/ui/button";
```

### Naming Conventions

| Element    | Convention       | Example                                 |
| ---------- | ---------------- | --------------------------------------- |
| Files      | kebab-case       | `user-service.ts`, `user-controller.ts` |
| Classes    | PascalCase       | `UserService`, `AIAgentController`      |
| Interfaces | PascalCase       | `UserDto`, `WeaponDto`                  |
| Enums      | PascalCase       | `Role`, `AgentStatus`                   |
| Methods    | camelCase        | `findByEmail()`, `register()`           |
| Variables  | camelCase        | `existUser`, `isPasswordValid`          |
| Constants  | UPPER_SNAKE_CASE | `USER_REPOSITORY`, `JWT_SECRET`         |

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
  @PrimaryGeneratedColumn("uuid")
  @Property()
  id!: string;

  @Column({ unique: true })
  @Required()
  @Property()
  email!: string;

  @Column({ nullable: true })
  @Property()
  name?: string;

  @CreateDateColumn()
  @Property()
  createdAt!: Date;

  @UpdateDateColumn()
  @Property()
  updatedAt!: Date;
}
```

### Repository Pattern

```typescript
import { Injectable } from "@tsed/di";
import { DataSource, FindOneOptions } from "typeorm";
import { AppDataSource } from "../datasources/AppDataSource.js";
import { User } from "../entities/User.js";

export const USER_REPOSITORY = Symbol.for("UserRepository");

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
import { User } from "../entities/User.js";
import { UserCreateDto } from "src/validators/UserDto";
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

  @Get("/")
  @Summary("Get all users")
  @(Returns(200, Array).Of(User))
  getAll() {
    return this.service.findAll();
  }
}
```

### Service Pattern

```typescript
import { Injectable } from "@tsed/di";
import { BadRequest } from "@tsed/exceptions";
import { UsersRepository } from "../repositories/UsersRepository.js";
import { User } from "../entities/User.js";

@Injectable()
export class UserService extends UsersRepository {
  async register(data: {
    email: string;
    name?: string;
    password?: string;
  }): Promise<User> {
    const existUser = await this.findByEmail(data.email);
    if (existUser) {
      throw new BadRequest("User already exists");
    }
    return this.create(data);
  }
}
```

### Error Handling

- Use `@tsed/exceptions` for HTTP errors
- Throw `BadRequest`, `NotFound`, `Unauthorized`, `Forbidden`
- Return meaningful error messages

```typescript
import { BadRequest } from "@tsed/exceptions";

throw new BadRequest("User already exists");
```

### DTO/Validation Pattern

```typescript
import { Property } from "@tsed/schema";
import { Email, MinLength, Required } from "@tsed/schema";

export class UserCreateDto {
  @Required()
  @Email()
  @Property()
  email!: string;

  @Required()
  @MinLength(6)
  @Property()
  password!: string;

  @Property()
  name?: string;
}
```

### React/Next.js Patterns

**Client Components:**

```typescript
"use client";

import { Button } from "@repo/ui/components/ui/button";
import { useState } from "react";

export default function Page() {
  const [state, setState] = useState(false);
  return <Button onClick={() => setState(!state)}>Click me</Button>;
}
```

**Server Components (default):**

```typescript
import { Button } from "@repo/ui/components/ui/button";

export default function Page() {
  return <Button>Server rendered</Button>;
}
```

### Styling

- Use Tailwind CSS via `@repo/ui`
- Use `clsx` and `tailwind-merge` for conditional classes
- Follow existing color patterns (cyan, violet gradients)

```typescript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}
```

### ESLint Configuration

The project uses:

- `@vercel/style-guide` for Next.js
- `eslint-config-prettier` for formatting
- `eslint-config-turbo` for monorepo
- `@typescript-eslint` for TypeScript

### Prettier Configuration

Run formatting before committing:

```bash
bun run format
```

### Architecture Summary

```
apps/api/src/
├── controllers/    # Route handlers
├── services/       # Business logic
├── repositories/  # Data access
├── entities/       # TypeORM models
├── validators/     # DTOs
├── middlewares/    # Express middleware
├── interceptors/  # Request/response interceptors
├── decorators/     # Custom decorators
├── config/         # Configuration
└── datasources/    # Database connection

apps/web/app/
├── (authentification)/  # Login, register pages
├── (dashboard)/         # Protected dashboard routes
├── posts/               # Blog posts
└── layout.tsx          # Root layout
```

### Skills Package (@hydroid/skills)

The skills package provides specialized AI capabilities using SOLID principles:

```typescript
// Import skills
import {
  ScrappingSkill,
  OsintSkill,
  LLMSkill
} from "@hydroid/skills";

// LLM Skill
const llm = new LLMSkill({
        provider: "ollama",
        model: llmConfig.model ?? "qwen2.5:14b",
        enabled: true,
        ...llmConfig,
      });
const response = await llm.generate("Hello");

// Scraping Skill
const scraper = new ScrappingSkill()
const data = await scraper.scrape({ url: "https://example.com" });

// OSINT Skill (depends on ScrapingSkill)
const osint = new OsintSkill(
    scraper || new ScrapingSkill({ enabled: true })
  );

const result = await osint.search({ target: "John Doe", type: "person" });
```

### Key Dependencies

| Package      | Version | Purpose                 |
| ------------ | ------- | ----------------------- |
| Bun          | 1.1.21  | Package manager/runtime |
| Ts.ED        | 8.x     | Backend framework       |
| TypeORM      | 0.3.x   | Database ORM            |
| Next.js      | 15.x    | Frontend framework      |
| React        | 19.x    | UI library              |
| Zod          | 4.x     | Validation              |
| Zustand      | 4.x     | State management        |
| Tailwind CSS | 4.x     | Styling                 |

### UI Components

The `@repo/ui` package includes reusable components in `src/components/`:

- **card/**: FeatureCard, StatCard, StepCard, ModelCard, SearchResultCard, ActionCard
- **composable/Sections.tsx**: FeatureSection, StatSection, StepsSection, ActionGrid
- **ui/**: Standard shadcn/ui components (Button, Card, Badge, etc.)

```typescript
// Using reusable sections
import { FeatureSection, StatSection, ActionGrid } from "@repo/ui/components/composable/Sections";

<FeatureSection
  title="Features"
  features={[{ icon: Search, title: "OSINT", description: "...", color: "from-cyan-500 to-blue-500" }]}
/>
```

### Best Practices

1. Always use TypeScript strict mode
2. Import local files with `.js` extension
3. Use repository pattern for data access
4. Use services for business logic
5. Use controllers only for routing
6. Handle errors with proper HTTP exceptions
7. Run `bun run format` before commits
8. Run `bun run lint` to check for issues
9. Use `@tsed/schema` decorators for validation
10. Follow existing file organization patterns
