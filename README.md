# ExamWay Landing Page

Marketing landing page for the ExamWay platform (students + learning centers).

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

## Where to edit copy

- `src/lib/i18n.ts` - Uzbek and English copy, labels, FAQ, pricing.
- `src/components/landing-page.tsx` - section layout and structure.
- `src/app/layout.tsx` - metadata and fonts.

## Lead storage

- API route: `src/app/api/lead/route.ts`
- Local data file: `data/leads.json`
