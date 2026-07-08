# AGENTS.md - Agentic Coding Guidelines

## Overview

Hydroid AI is a Turborepo monorepo using **Bun** as package manager:

- **apps/api**: Ts.ED backend (Express) with TypeORM + Prisma, SQLite
- **apps/web**: Next.js 16 frontend with React 19, Tailwind v4
- **apps/docs**: Next.js 15 documentation site (MDX)
- **packages/ui**: Shared UI library (Radix + shadcn/ui-style components)
- **packages/eslint-config**: Shared ESLint configs
- **packages/typescript-config**: Shared TS configs

## Build, Lint, Format Commands

### Root (Turborepo)

```bash
bun run build          # turbo build
bun run dev            # turbo dev
bun run lint           # turbo lint
bun run format         # prettier --write \"**/*.{ts,tsx,md}\"
```

### API (apps/api)

```bash
bun run dev              # barrels + bun --watch src/index.ts
bun run build            # bun build --target=bun src/index.ts --outfile=dist/index.js
bun run barrels          # generate barrel imports
bun run prisma:migrate   # prisma migrate dev
bun run prisma:generate  # prisma generate
bun run start:prod       # production start
```

### Web (apps/web)

```bash
bun run dev     # next dev --turbo
bun run build   # next build
bun run lint    # next lint
bun run start   # next start
```

### Running Tests

No test framework is installed. To add and run tests:

```bash
bun add -D vitest
bun vitest run                              # all tests
bun vitest run src/services/user.test.ts    # single file
bun vitest                                  # watch mode
```

## Code Style Guidelines

### TypeScript Configuration

- `strict: true`, `noUncheckedIndexedAccess: true`
- API: `experimentalDecorators: true`, `emitDecoratorMetadata: true` (Ts.ED)
- Web: Extends `@hydroid/typescript-config/nextjs.json` (next.config.mjs)
- API: `module: CommonJS`, base extends `@hydroid/typescript-config/base.json`
- Path alias: Web uses `@/*` -> `./*`; API uses `src/` as baseUrl

### Imports

- **Local files**: ESM with `.js` extension (e.g., `from "../entities/User.js"`)
- **External packages**: no extension (e.g., `from "@tsed/di"`)
- **Within API**: can use `src/` path alias (e.g., `from "src/services/UserService"`)
- **Within Web**: use `@/` alias (e.g., `from "@/components/theme-provider"`)
- **UI package**: use `@hydroid/ui/components/ui/button`

### Naming Conventions

| Element           | Convention       | Example           |
| ----------------- | ---------------- | ----------------- |
| Files             | kebab-case       | `user-service.ts` |
| Classes           | PascalCase       | `UserService`     |
| Interfaces        | PascalCase       | `UserDto`         |
| Enums             | PascalCase       | `SearchStatus`    |
| Methods/Functions | camelCase        | `findByEmail()`   |
| Variables         | camelCase        | `existUser`       |
| Constants         | UPPER_SNAKE_CASE | `USER_REPOSITORY` |

### Entity Pattern (TypeORM + Ts.ED)

```typescript
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

### Controller Pattern (Ts.ED)

```typescript
@Controller("/users")
@Docs("api-docs")
export class UserController {
  @Inject() protected service!: UserService;

  @Post("/register")
  @Title("Create User")
  @Summary("Create a new user")
  @Returns(201, User)
  async signupUser(
    @BodyParams() @Groups("creation") user: UserCreateDto,
  ): Promise<User> {
    return this.service.register(user);
  }
}
```

### DTO/Validation

```typescript
export class UserCreateDto {
  @Required() @Email() @Property() email!: string;
  @Required() @MaxLength(13) @Property() password!: string;
}
```

### Error Handling

- API: `throw new BadRequest("message")` from `@tsed/exceptions`
- Available: `BadRequest`, `NotFound`, `Unauthorized`, `Forbidden`
- Web: Zod for frontend validation

### React/Next.js

- **Client components**: `"use client"` directive
- **Server components**: default (no directive)
- Styling: Tailwind CSS v4 via `@hydroid/ui/globals.css`
- Utility: `cn()` from `clsx` + `tailwind-merge` (in `packages/ui/src/lib/utils.ts`)
- Icons: `lucide-react`

### Styling (Dark Monochrome Theme)

- Backgrounds: `bg-black`, `bg-gray-900`, `bg-gray-950`
- Text: `text-gray-100`, `text-gray-400`, `text-gray-500`
- Buttons: `bg-gray-700`, `bg-gray-100` (inverted)
- Borders: `border-gray-800`, `border-gray-700`
- **No colors** - gray scale only, avoid gradients

### Architecture

```
apps/api/src/     apps/web/app/
├── controllers/  ├── (authentification)/
├── services/     ├── (dashboard)/
├── repositories/ │   ├── dashboard/
├── entities/     │   ├── osint/
├── validators/   │   ├── scraping/
├── tools/        │   └── ai-hub/
└── datasources/  └── layout.tsx
```

### Packages

| Package   | npm name                     | Export path pattern                    |
| --------- | ---------------------------- | -------------------------------------- |
| API       | `@hydroid/api`               | -                                      |
| Web       | `@hydroid/web`               | `@/*` -> `./*`                         |
| Docs      | `@hydroid/docs`              | -                                      |
| UI        | `@hydroid/ui`                | `@hydroid/ui/components/ui/*`          |
| ESLint    | `@hydroid/eslint-config`     | `@hydroid/eslint-config/next.js`       |
| TS Config | `@hydroid/typescript-config` | `@hydroid/typescript-config/base.json` |

### Best Practices

1. TypeScript strict mode always
2. Local imports with `.js` extension (API)
3. Repository pattern for data access; services for business logic
4. Controllers only for routing/decorators (thin)
5. Use `@tsed/schema` decorators for DTO validation
6. Run `bun run format` and `bun run lint` before commits
7. Dark monochrome theme only (gray scale, no colors)
8. `@tsed/di` for DI (`@Injectable`, `@Inject`)
9. Full decorator metadata (Ts.ED + TypeORM)
10. Use `Symbol.for()` for repository DI tokens when needed
