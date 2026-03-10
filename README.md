# Hydroid AI - Project Documentation

## Overview

**Hydroid AI** is a comprehensive intelligence and data analysis platform designed for OSINT (Open Source Intelligence), web scraping, data analysis, and AI-powered content generation.

## Architecture

### Backend (Ts.ED + TypeORM + SQLite)

- **Framework**: Ts.ED (Node.js/Bun)
- **ORM**: TypeORM
- **Database**: SQLite
- **AI Integration**: Ollama + LM Studio

### Frontend (Next.js)

- **Framework**: Next.js 14+
- **Styling**: Custom CSS + Shadcn UI
- **State Management**: Zustand

## Core Features

### 1. AI Agents & Actions

Unlike traditional AI agent hubs, Hydroid focuses on **actions** rather than chat interfaces:

- **OSINT Operations**: Human profiling, building intelligence, object tracking
- **Web Scraping**: Automated data collection from multiple sources
- **Data Analysis**: Pattern recognition, threat assessment
- **Image Generation**: AI-powered visual content creation
- **Text Processing**: NLP, sentiment analysis, entity extraction

### 2. Fine-Tuning & Custom Models

- Integration with Qwen (fine-tuned via Ollama)
- LM Studio support for local model deployment
- Custom LoRA configurations

### 3. Specialized Skills

#### Scraper Skills

- Web crawling
- Social media scraping
- Dark web monitoring
- API data extraction

#### OSINT Skills

- Human profiling
- Infrastructure mapping
- Geolocation analysis
- Image reverse search

#### Image Generation

- Diffusion models integration
- Style transfer
- Face generation
- Scene reconstruction

## API Endpoints

### Users

- `POST /api/users` - Create user
- `POST /api/users/login` - Login
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

### Weapons (Premium Content)

- `POST /api/premium/weapons` - Create weapon
- `GET /api/premium/weapons` - List weapons
- `GET /api/premium/weapons/:id` - Get weapon
- `PUT /api/premium/weapons/:id` - Update weapon
- `DELETE /api/premium/weapons/:id` - Delete weapon

### AI Agents

- `POST /api/agents` - Create agent
- `GET /api/agents` - List agents
- `GET /api/agents/:id` - Get agent
- `PUT /api/agents/:id` - Update agent
- `DELETE /api/agents/:id` - Delete agent
- `POST /api/agents/:id/activate` - Activate agent
- `POST /api/agents/:id/deactivate` - Deactivate agent
- `POST /api/agents/:id/tasks` - Create task
- `POST /api/agents/:id/execute` - Execute task

### Fine-Tuning

- `POST /api/ai-models` - Create AI model
- `GET /api/ai-models` - List models
- `POST /api/fine-tuning` - Create fine-tuning job
- `GET /api/fine-tuning` - List jobs
- `POST /api/fine-tuning/:id/start` - Start job
- `POST /api/fine-tuning/:id/cancel` - Cancel job

### OSINT

- `POST /api/osint/search` - Create search
- `GET /api/osint/searches` - List searches
- `GET /api/osint/humans` - Human profiles
- `GET /api/osint/buildings` - Building intelligence
- `GET /api/osint/objects` - Object tracking

### LoRA Configs

- `POST /api/lora-configs` - Create config
- `GET /api/lora-configs` - List configs

## Technology Stack

### Backend

- Bun runtime
- Ts.ED framework
- TypeORM
- SQLite
- Ollama SDK
- LM Studio integration

### Frontend

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS (optional)
- Zustand

## Getting Started

### Prerequisites

- Bun runtime
- Node.js 18+
- Ollama or LM Studio

### Installation

```bash
# Install dependencies
bun install

# Install additional packages
bun add typeorm reflect-metadata sqlite3
```

### Running the Application

```bash
# Backend
cd apps/api
bun run dev

# Frontend
cd apps/web
bun run dev
```

## Scripts

### Ollama Management

```bash
# Pull models
ollama pull qwen2.5:14b
ollama pull llama3.2

# List models
ollama list

# Start Ollama server
ollama serve
```

### LM Studio Integration

```bash
# Start LM Studio server on port 1234
# Configure API endpoint in settings
```

## Database Schema

### Core Entities

- **User**: Authentication and profile
- **AIAgent**: AI agent configurations
- **AgentTask**: Task definitions
- **AgentExecution**: Execution history
- **FineTuneJob**: Fine-tuning jobs
- **LoRAConfig**: LoRA configurations
- **OsintSearch**: OSINT queries
- **HumanProfile**: Human intelligence data
- **Building**: Building intelligence
- **Item**: Object tracking
- **Weapon**: Premium content (restricted)

## Security

- JWT-based authentication
- Role-based access control
- Premium content restrictions

## Roadmap

- [x] Migrate from Prisma to TypeORM
- [ ] Integrate Ollama + LM Studio
- [ ] Build specialized skill modules
- [ ] Create action-focused UI
- [ ] Implement advanced scraping
- [ ] Add image generation pipeline

## License

MIT
