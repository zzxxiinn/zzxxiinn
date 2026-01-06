# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a monorepo containing:
- **web/**: Next.js 16 web application (primary active project)
- **api/**: Backend API (planned, currently empty)
- **game/**: Game development (planned, currently empty)

## Development Commands

All commands should be run from the `web/` directory:

```bash
# Development server (port 3000)
bun dev

# Production build
bun run build

# Start production server
bun start

# Linting
bun run lint
```

Package manager: **Bun** (use `bun` instead of `npm`)

## Tech Stack

- **Next.js 16** with App Router (`src/app/`)
- **React 19** with React Compiler enabled
- **TypeScript 5** (strict mode)
- **Tailwind CSS v4** (no config file - uses built-in defaults via @tailwindcss/postcss)
- **ESLint 9** (flat config format)

## Architecture

### Next.js App Router
- Pages and layouts in `web/src/app/`
- Path alias: `@/*` maps to `./src/*`
- Server Components by default (React 19)

### Styling
- Tailwind CSS v4 utility classes
- Global styles in `web/src/app/globals.css`
- Use `clsx` and `tailwind-merge` for conditional class composition

### UI Libraries
- **Lucide React** for icons
- **React Markdown** for markdown rendering
