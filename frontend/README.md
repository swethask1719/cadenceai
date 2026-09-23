# Cadence AI — Frontend

A modern Next.js (App Router) frontend featuring a split-screen authentication page:
the **left half is Sign up** and the **right half is Log in**.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- Plain CSS (no extra UI dependencies)

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:3000

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start dev server (port 3000) |
| `npm run build` | Production build             |
| `npm run start` | Run production build         |
| `npm run lint`  | Lint                         |

## Structure

```
frontend/
├── app/
│   ├── globals.css   # Design system, gradients, glassmorphism, animations
│   ├── layout.tsx    # Root layout + metadata
│   └── page.tsx      # Split signup (left) / login (right) page
├── next.config.js
├── package.json
└── tsconfig.json
```

## Notes

- Forms are client-side only and log submissions to the console; wire them to the
  backend API when ready.
- Layout collapses to a single column on screens narrower than 860px.