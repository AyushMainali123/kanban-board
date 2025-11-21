# Kanban Board

A lightweight, single‑page Kanban board built with Next.js, TypeScript, Tailwind CSS and Zustand. This app supports multiple boards, columns and tasks with drag-and-drop ordering, Keyboard navigation accessibility, and local persistence.

## Features

- Create, and delete boards, columns and tasks
- Rename columns, and tasks
- Drag and drop columns and tasks using `@dnd-kit` sortable utilities
- Persistent client state using `zustand` with `persist` (localStorage)
- Forms validated with `react-hook-form` and `zod`
- Accessible UI primitives with Radix (ShadCN) and iconography via `lucide-react`

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS
- Zustand (state management)
- @dnd-kit (drag and drop)
- react-hook-form + zod (forms & validation)
- Radix UI(ShadCN) (dialogs, labels, separators)

## Quick Start

Prerequisites: Node.js 22+ and `pnpm` (recommended). The repository contains a `pnpm-lock.yaml`.

Install dependencies:

```powershell
pnpm install
```

Run the development server:

```powershell
pnpm dev
```

Build for production:

```powershell
pnpm build
pnpm start
```

Helper scripts (from `package.json`):

- `pnpm lint` — run ESLint
- `pnpm format` — run Prettier

## Project Structure (important files)

- `src/app/` — Next.js App Router pages and layout
  - `app/(boards)` — UI for the boards list
  - `app/b/[id]` — Board detail / kanban view
- `src/components/` — shared UI components and design system primitives
- `src/store/` — Zustand stores and persistence
  - `boards.ts` — board CRUD and removal logic
  - `columns.ts` — column CRUD, swap ordering and cascade deletion of tasks
  - `tasks.ts` — task CRUD, move/swap and content updates
  - `active-drag.ts` — tracks the currently-dragged column/task

## State & Persistence

State is handled with `zustand` and persisted to `localStorage` using `persist`. Each store uses a separate key:

- `board-storage` (boards)
- `columns-storage` (columns)
- `task-storage` (tasks)
