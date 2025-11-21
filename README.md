# Kanban Board

A lightweight, single‑page Kanban board built with Next.js, TypeScript, Tailwind CSS and Zustand.

## Demo Video

[![Demo Video](https://kanban-board-pi-mauve.vercel.app/app-demo.mp4)]

## Features

- Board Layout
  - N number of columns that can be added or removed according to the requirement
  - Each card has a title, and optional description
  - Add new card button for every column
- Drag and Drop
  - Cards draggable between columns
  - Highlight column and tasks during drag
- Animations
  - Smooth drag and drop transitions
  - Animted creation or removal of tasks
  - Modal transition on edit task
- Persistence
  - Localstorage persistance
- Additional Features
  - Editable Task title, and description.
  - Add or rename columns
  - Add or remove boards
  - Board displays only those cards, and columns that are created under it.
  - Filter / Search (Store structre created in a way that we can implement this functionality in the future).
  - Column Reordering.
  - Keyboard Accessibility (On Space).

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
