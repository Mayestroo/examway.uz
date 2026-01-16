# AGENTS.md — Master instructions for Codex

Agents should prioritize correctness and clarity over speed.
If uncertain, explain assumptions before coding.

## Project name

Working name: ExamWay (subject to change)

## Product vision (IMPORTANT)

This project will become a scalable EdTech platform with two core directions:

### B2C (Students)

- Self-study language courses (IELTS-focused initially)
- Clear learning paths, progress tracking, exam-oriented outcomes
- Mock tests that simulate real IELTS conditions

### B2B (Learning Centers)

- Sell a mock test system as a product (SaaS)
- White-label support (center logo, colors, custom domain later)
- Admin dashboard for:
  - Managing teachers and students
  - Assigning mock tests
  - Viewing analytics and reports
- Multi-tenant architecture in the future (design with this in mind)

Even if we are building only a landing page now, **all structure, copy, and naming must be compatible with this future**.

---

## Current scope (DO NOT GO BEYOND THIS)

Build a **high-conversion marketing landing page** at `/`.

### Target users

1. Individual students preparing for IELTS
2. Owners/managers of learning centers

### Main goals

- Explain value clearly in under 5 seconds
- Collect leads:
  - Student waitlist
  - B2B demo requests

---

## Tech stack (strict)

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Minimal dependencies only
- No backend frameworks beyond Next API routes

---

## UX & content rules

- Uzbek is the primary language (default)
- English is secondary (toggle)
- Tone:
  - Professional
  - Exam-oriented
  - Trust-building
- Avoid buzzwords and vague claims
- Always explain **outcomes**, not features

---

## B2B positioning rules (VERY IMPORTANT)

When writing copy or structuring sections:

- Clearly separate:
  - “For Students”
  - “For Learning Centers”
- Emphasize:
  - Time savings for centers
  - Standardized testing
  - Easy reporting
  - Revenue opportunity (sell mock tests internally)

---

## Design rules

- Clean, modern, minimal
- Mobile-first
- Strong visual hierarchy
- No gimmicks, no unnecessary animations
- CTA visible above the fold

---

## API & data (landing phase only)

- Single endpoint: `/api/lead`
- Lead types:
  - `student`
  - `center`
- Store data locally (JSON or sqlite)
- Easy to replace with real DB later

---

## Non-goals (DO NOT IMPLEMENT)

- No authentication
- No dashboards
- No payments
- No AI evaluation logic
- No external services (email, CRM, analytics)

---

## Repo conventions

- Use `/components`, `/app`, `/lib`
- Keep files small and readable
- No commented-out code
- Remove unused styles/components

---

## Required checks before finishing any task

- [ ] `npm run build` passes
- [ ] Mobile layout tested
- [ ] Forms validate correctly
- [ ] Uzbek copy is clear and natural
- [ ] B2B value is obvious without explanation

---

## When uncertain

If a decision may affect future architecture:

1. Write a short plan in `PLANS.md`
2. Explain trade-offs
3. Then implement

Codex must always prefer **simplicity + future compatibility**.
