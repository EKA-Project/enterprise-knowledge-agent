# Mock service layer (Phase B)

Pages call services. Only services touch `mockDb.js`. When the backend is ready,
only the bodies of these functions change (see data-architecture.md, section 11).

## Writing a new service
1. Import `db` from `./mockDb.js`. Never import `data/mock/*` directly and never
   mutate the exported seed arrays; `npm run validate:mock` checks the seed data.
2. Make every function `async`, start with `await delay()`, and return `clone(...)`.
3. Return the stored shapes from `src/types/`. Do not invent page-specific fields.
4. Get the viewer with `getMockCurrentUser()` and apply `canReadDocument` and the
   write rules in `utils/documentPermissions.js` and `utils/departmentPermissions.js`.
   Hiding a button in the UI is never the permission check.
5. Throw `ServiceError(status, message)` for refused writes (403, 404, 409, 422).
   A document the viewer cannot read looks the same as a missing one.
6. Compute derived values (counts, "New", read time) on each call; never store them.
7. If you add or change mock data, extend `scripts/validateMockData.js` too.

## Page rules
- Re-fetch when the role changes: put `activeRole` in the effect's dependency list.
- Show loading, empty and error states from day one; the real API is not instant.
- When a page moves to services, delete its old per-page data file in the same PR.

## Not built yet (add when a page needs it)
insight, bookmark, activity, analytics and storage services; user writes (invite,
edit, deactivate); department delete; clearing `isProtected` (seed-only for now).