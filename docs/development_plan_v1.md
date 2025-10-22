# BirdSong Frontend – v1 Development Plan

This plan outlines the milestones, deliverables, and dependencies for shipping the BirdSong frontend MVP.

## Milestone 0 – Planning & Foundations (Week 0)
- Finalize framework/tooling choices (React + Vite + Tailwind/Radix).
- Confirm hosting strategy and environment configuration.
- Align with backend on required v1.1 endpoints (see `integration_notes.md`).
- Produce high-level wireframes for timeline, bucket detail, and navigation.

**Exit criteria**: Architecture decisions documented, backlog groomed, design artifacts approved.

## Milestone 1 – Project Bootstrap (Week 1)
- Scaffold project (`pnpm create vite` or equivalent) with TypeScript + React.
- Configure linting, formatting, testing (ESLint, Prettier, Vitest + Testing Library).
- Integrate Tailwind (or chosen styling approach) and set up base theme tokens.
- Add CI workflow for lint/test (optional if backend repo handles unified CI).

**Exit criteria**: Repo builds, tests, and linting pass locally; base layout renders with placeholder timeline.

## Milestone 2 – Data Layer & API Clients (Week 2)
- Implement API client module using Axios/fetch + TanStack Query.
- Define TypeScript types from backend schemas (`DetectionFeedResponse`, etc.).
- Build environment config loader (API base URL, feature flags).
- Handle request/response errors with shared toast/banner components.

**Exit criteria**: API client can fetch sample detections; mocked data used while backend endpoints finalize.

## Milestone 3 – Timeline Experience (Weeks 3–4)
- Implement timeline bucket list with virtualization/infinite scroll.
- Render single- and multi-detection bucket states with responsive layout.
- Add quarter selector + “jump to latest” controls.
- Integrate loading/error/empty states.

**Dependencies**: Backend bucketed timeline endpoint or equivalent API support.

## Milestone 4 – Detail Interactions & Media (Week 5)
- Implement bucket detail drawer/modal with detection cards.
- Add image loading with attribution credits.
- Integrate optional audio playback (user-triggered).
- Surface location hints, confidence badges, and summary chips.

## Milestone 5 – Polishing & Launch Readiness (Week 6)
- Accessibility QA (keyboard navigation, screen-reader labels, contrast).
- Performance tuning (lazy loading, bundle analysis).
- Responsive tweaks for tablet/desktop breakpoints.
- Add About/Data Sources static page.
- Smoke tests against staging backend.

**Exit criteria**: Feature complete, QA signed off, ready for production deploy.

## Stretch / Post-v1 Backlog
- Species spotlight quick view.
- Real-time updates via websockets/SSE.
- User personalization (favorites, alerts).
- Offline caching/PWA support.

## Risks & Mitigations
- **Backend dependency slip**: use mocked responses during development; gate launch on API availability.
- **Large payloads**: implement pagination/virtualization early; coordinate with backend for filtering.
- **Design unknowns**: schedule design reviews before Milestone 2 to avoid churn.

## Tracking
- Set up GitHub Projects (or equivalent) with columns per milestone.
- Each task should reference relevant docs (`overview.md`, `integration_notes.md`).
- Hold weekly sync with backend team to review blockers.
