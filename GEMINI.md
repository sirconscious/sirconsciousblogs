# Project Instructions: sircounsiousDocs

This is a Next.js application (v16.2.9) bootstrapped with `create-next-app`, utilizing the App Router architecture. It is configured with modern frontend technologies including React 19, Tailwind CSS 4, and TypeScript.

## Core Mandates (Crucial)

> [!IMPORTANT]
> **This is NOT the Next.js you know.**
> This project uses a version of Next.js (v16.2.9) that includes breaking changes, new APIs, and different file structure conventions compared to standard versions (v13-15).
> **Always refer to the local documentation in `node_modules/next/dist/docs/` before implementing features or writing code.**
> Heed all deprecation notices and version-specific warnings found in the codebase.

## Tech Stack

- **Framework:** Next.js 16.2.9 (App Router)
- **Library:** React 19.2.4
- **Styling:** Tailwind CSS 4 (using `@tailwindcss/postcss`)
- **Language:** TypeScript 5
- **Linting:** ESLint 9 (Flat config in `eslint.config.mjs`)

## Project Structure

- `app/`: Contains the application routes, components, and global styles.
  - `layout.tsx`: Root layout with Geist font integration.
  - `page.tsx`: Main entry point (Home page).
  - `globals.css`: Global CSS with Tailwind 4 imports.
- `public/`: Static assets like SVG logos and icons.
- `next.config.ts`: Next.js configuration (TypeScript).
- `AGENTS.md`: Specific instructions for AI agents (points to these mandates).

## Building and Running

| Task | Command |
| :--- | :--- |
| Development | `npm run dev` |
| Build | `npm run build` |
| Start Prod | `npm run start` |
| Linting | `npm run lint` |

## Development Conventions

- **Routing:** Use the App Router convention within the `app/` directory.
- **Styling:** Prefer Tailwind CSS 4 utility classes. Global styles are defined in `app/globals.css`.
- **Typing:** Strict TypeScript is preferred. Ensure all new components and functions are properly typed.
- **AI Guidance:** Before proposing architectural changes, verify they align with the docs in `node_modules/next/dist/docs/`.
- **Icons/Images:** Use `next/image` for optimized image rendering.
