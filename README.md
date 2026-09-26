# FitLog

FitLog is a dark, focused workout library app built to help users browse exercises, save lifts for later, and plan out a training day without clutter. The experience is optimized for desktop, tablet, and mobile screens with a clean gym aesthetic and responsive grid layout.

## Technologies Used

- Next.js 16
- TypeScript
- React 19
- Tailwind CSS
- LocalStorage for plan persistence
- Public workout API with remote imagery

## Key Features

1. Responsive workout library with a sort dropdown for duration, calories, and rating.
2. Detailed workout pages with equipment specs, step-by-step instructions, and action buttons.
3. Today’s Plan and Saved state management with live badge counters in the navbar.
4. My Plan page with metrics, tabs, loading state, empty state, and completion actions.
5. Toast feedback, 404 handling, and local persistence so workouts remain available after refresh.

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:3000 to view the app.

## Production Build

```bash
npm run build
npm run start
```
