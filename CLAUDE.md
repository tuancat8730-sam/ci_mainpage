# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite, default port 5173)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint
```

No test runner is configured.

## Deployment

`deploy-gcs.sh` deploys to Firebase Hosting (despite the filename): builds, checks/installs the Firebase CLI, verifies `firebase login` auth, then runs `firebase deploy --only hosting`. Config lives in `firebase.json` (serves `dist/`, rewrites all routes to `index.html` for client-side routing) and `.firebaserc` (default project — update before first deploy, the placeholder project may not exist yet).

## Architecture

React 19 SPA built with Vite, using React Router 7 (`BrowserRouter`) and Bootstrap 5. This is a greenfield rebuild of the Capital Irrigation marketing site — it mirrors the sibling project `ci_lawn/ci_lawn_web`'s architecture and ports content from the legacy `ci_mainsite` (React 18 / Bootstrap 4) repo. Neither sibling repo is part of this codebase; do not assume their files are reachable at runtime.

**Entry point:** `index.html` → `src/main.jsx` → `src/App.jsx`

**CSS import order matters** (`src/main.jsx`): `index.css` (reset) → `styles/variables.css` (design tokens) → `styles/bootstrap-override.scss` (Sass `$variable` overrides, then `@import 'bootstrap/scss/bootstrap'`) → `styles/animations.css` → `styles/navbar.css` → `styles/hero.css` → `styles/sections.css` → `styles/forms.css` → `styles/responsive.css` (loaded **last** so its mobile-first overrides win the cascade).

**Routing:** All routes are declared in `src/App.jsx` inside a single `<Route element={<Layout />}>` wrapper. `src/layout/Layout.jsx` renders `Navbar` → `<Outlet />` → `Footer`, plus a `ScrollToTop` helper that resets scroll position on route change.

**Page composition pattern:** Each file in `src/pages/` is a thin composition of `src/components/sections/*` components (e.g. `Home.jsx` stitches together `Hero`, `ServicesGrid`, `WhyChooseUs`, `InstallationHighlights`, `Testimonials`, `ServiceArea`, `CTASection`). Pages set `document.title` via `useEffect`.

**Data/component split:** Business content (services, testimonials, FAQs, pricing packages, installation steps, business contact info) lives as plain JS objects/arrays in `src/data/*.js`, decoupled from the components that render them. When porting or updating copy, edit the data file, not the component.

**Shared UI primitives** (`src/components/ui/`):
- `ScrollReveal.jsx` — wraps `useInView` (react-intersection-observer) to toggle `reveal`/`reveal-left`/`reveal-right` + `visible` classes (defined in `styles/animations.css`) for scroll-triggered entrance animations. Supports `direction` and `delay` (1-5) props.
- `SectionHeader.jsx` — consistent eyebrow/title/subtitle heading pattern used at the top of nearly every section.

**Forms:** `useQuoteForm` (`src/hooks/useQuoteForm.js`) centralizes the quote-request form's field state, validation, and submit logic (POSTs JSON via axios to `https://api.capitalirrigation.com/api/submit-quote-form/`; navigates to `/thanks/` on HTTP 200; silently swallows errors, matching legacy behavior). `src/components/sections/QuoteForm.jsx` is the shared form UI consumed by both `pages/Quote.jsx` and `pages/LawnQuote.jsx`, which differ only in the `subject` string passed in. `pages/PayInvoice.jsx` posts directly to an external payment gateway (config in `src/data/constants.js`) and is unrelated to `useQuoteForm`.

**Static assets:** Images referenced by page/section components live in `public/static/img/` and are served as-is (not processed by Vite); reference them with root-relative paths like `/static/img/logo2.png`.

**No build-time env vars** are used. API/gateway URLs are hardcoded in `src/data/constants.js` and `src/hooks/useQuoteForm.js`.
