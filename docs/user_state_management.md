# Frontend User State Management Proposal

This document outlines how the web client should capture and persist user-facing preferences today, while leaving a clean path toward richer profile storage once authentication and server-side profiles arrive.

## Goals
- Remember lightweight preferences (currently the timeline bucket minutes and optional start cursor) between browser sessions without requiring a backend account.
- Centralize state handling so components do not reimplement persistence logic.
- Design the shape of the state so it can be promoted to an authenticated profile service later without breaking the UI.

## Recommended Approach (Pre-Auth)
1. **Create a `useUserPreferences` hook** that exposes read/write helpers and the current preference snapshot. Internally, it should:
   - Maintain React state so components update reactively.
   - Mirror updates to `localStorage` (or fall back to in-memory storage if the API is unavailable, e.g., in SSR or privacy modes).
   - Validate and coerce stored values to the expected schema when hydrating.
2. **Define a narrow preferences schema** for now (e.g., `{ timeline: { bucketMinutes: number; startCursor?: string | null } }`). Keep it versioned so migrations are possible later.
3. **Wrap storage access in a small service module** (`src/services/userPreferences.ts`) that handles serialization, schema upgrades, and exposure of a change event. The hook can subscribe to this service so multiple tabs remain in sync via the `storage` event.
4. **Provide the hook through context if we accumulate more consumers.** Today, `TimelinePage` can call the hook directly. When more components depend on the same data, a `UserPreferencesProvider` can lift the state higher.

### Why localStorage?
- Works without cookies or signing in.
- Keeps the logic entirely client-side until authentication lands.
- Easy to inspect/reset during development.
- Can be swapped for an API-backed store later: the hook keeps the interface stable while the storage service switches implementation.

## Transition Plan (Post-Auth)
When user accounts arrive:
1. Extend the preferences service so it delegates to a backend endpoint when the user is authenticated. The client should:
   - Flush local changes immediately to avoid losing updates.
   - Cache server responses locally for offline/latency tolerance.
2. Use a merge strategy on login: server wins for known keys, but preserve new local-only keys until they are synced.
3. Store additional preference domains (notifications, device labels, alert thresholds) under the same schema and expose them via the hook/context.
4. Consider encrypting or namespacing data if the app supports multi-user browsers or shared devices.

## Next Steps
- [ ] Implement `src/services/userPreferences.ts` with schema versioning and localStorage guards.
- [ ] Add `useUserPreferences` and swap `TimelinePage` to consume it instead of hard-coded `useState`.
- [ ] Document the public API of the hook for future contributors (e.g., in `frontend/docs/api.md` or Storybook notes).
- [ ] Add unit tests for serialization and migration logic.

This strategy gives us immediate persistence for the timeline grouping window and sets the foundation for richer profile features once authentication is in place. 
