# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

`lifeos-rr` is a React + TypeScript + Vite app, currently scaffolded from the Vite React template and in an early/minimal state (a counter demo wired up through routing and global state). The "rr" in the name refers to React Router, which is the intended routing layer.

## Commands

This project uses **pnpm** (see `pnpm-lock.yaml`).

- `pnpm dev` — start the Vite dev server with HMR
- `pnpm build` — type-check via `tsc -b` (project references across `tsconfig.app.json` / `tsconfig.node.json`) then build with Vite
- `pnpm lint` — run ESLint over the project
- `pnpm preview` — preview the production build locally

There is no test runner configured yet.

## Architecture

- **Entry point**: `src/main.tsx` creates a `createBrowserRouter` and renders `RouterProvider`. All routes are defined here as a flat route tree — new pages should be registered as children of the root route.
- **Root layout**: `src/components/App.tsx` is the root route element. It renders persistent nav (`Link`s to child routes) and an `<Outlet />` for child routes. Note it currently passes local `counter`/`setCounter` state via `Outlet context`, while child components actually read/write counter state through the Zustand store (`useCounterStore`) — these are two parallel, not-yet-unified state mechanisms.
- **State management**: Global state uses **Zustand** (`src/store/useCounterStore.ts`). The store groups mutating functions under an `actions` key (e.g. `state.actions.increment`) separate from state values (e.g. `state.count`), and components select narrowly via `useCounterStore(state => state....)`. Follow this actions-namespace pattern for new stores.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` (no separate Tailwind config file — v4 uses CSS-based config in `src/index.css`).
- **React Compiler**: enabled via `babel-plugin-react-compiler` + `@rolldown/plugin-babel` in `vite.config.ts`. Avoid manual `useMemo`/`useCallback` micro-optimizations that the compiler is meant to handle, unless needed for correctness.

## Code style

- Formatting is enforced by Prettier (`.prettierrc`): single quotes, `arrowParens: "avoid"`.
- TypeScript is strict, with `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch` enabled (`tsconfig.app.json`) — unused vars/params will fail the build, not just lint.
- ESLint config (`eslint.config.js`) extends `typescript-eslint` recommended, `react-hooks` recommended, and `react-refresh` (Vite) rules.
