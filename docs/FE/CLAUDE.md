# /FE/CLAUDE.md (DocTalk Reservation Front-End Rules)

## 0) Stack & environment

- Framework: Nuxt.js
- State management: Pinia
- Styling: SASS (scoped styles inside `.vue` files)
- HTTP: axios (fetch → axios migration in progress)
- Authentication: JWT (Access Token / Refresh Token)
- Package manager: npm
- E2E testing: Cypress
- Deployment: AWS EC2 (via GitHub Actions CI/CD)

## 1) Front-End priorities

1. Reservation and authentication flow stability
2. Consistent state management and API handling
3. Maintainability (structure, naming, separation of concerns)
4. User experience (loading states, errors, interactions)

Note: This is a B2B service; SEO optimization is **not** a priority.

## 2) Folder responsibilities

### pages/

- Routing entry points
- Page-level data composition
- Delegate complex UI to `components/`

### components/

- Reusable UI components
- Avoid over-generalizing page-specific components

### composables/

- Reusable business logic
- Must follow `useXxx` naming convention

### apis/

- All HTTP request definitions
- Standardizing on axios
- Authentication headers and error handling must be consistent

### stores/ (Pinia)

- Global/shared state only
- Prefer local state for UI-only concerns
- No direct DOM manipulation inside stores

### middleware/

- Authentication and authorization checks
- Must be SSR-safe

### plugins/

- Global setup (axios, auth, etc.)
- Clearly distinguish client vs server execution

### utils / types

- Pure utility functions and type definitions
- Minimize framework-specific dependencies

### cypress/

- End-to-end tests
- Use stable, non-brittle selectors

## 3) State & async naming rules

- Initial data loading: `loading`
- User-triggered requests (submit, save, click): `pending`
- Boolean variables must use `is / has / can / should` prefixes

## 4) Authentication rules (IMPORTANT)

- All authenticated requests use the Access Token
- When expired, reissue via Refresh Token
- Never log token values
- Authentication failure handling (logout, retry, redirect) must be explicit

## 5) API & error handling

- Expected errors: handle explicitly in UI
- Unexpected errors: delegate to common error handling logic
- When using axios interceptors, assess global impact carefully

## 6) Styling rules (SASS)

- Keep styles scoped to components
- Avoid excessive magic numbers and colors
- Follow existing styling patterns before introducing new ones

## 7) Verification commands (npm)

After changes, run at least one of the following when possible:

- `npm run dev`
- `npm run build:dev`
- `npm run build:staging`
- `npm run build:prod`
- `npm run test:e2e`

If commands were not executed, clearly state the reason.

## 8) Change policy

- Auth and reservation-related changes require careful impact analysis
- Shared component changes must be checked across all usages
- During the axios migration, clearly document any fetch/axios coexistence

## 9) Do Not

- Do not hardcode real tokens or cookies
- Do not add unnecessary global state
- Do not introduce structural changes without request
- Do not claim tes
