# Plan: Redesign Capital Irrigation marketing site as a new project (`ci_mainpage`)

**New project path**: `/home/tuancnh/code/ci_mainpage` (does not exist yet — greenfield scaffold)
**New git repo**: `git@github.com:tuancat8730-sam/ci_mainpage.git`
**Content/reference repo (read-only, never modified)**: `/home/tuancnh/code/ci_mainsite` — source of truth for existing routes, copy, business logic (Quote/LawnQuote/PayInvoice forms, FAQs, testimonials, careers)
**Design/architecture reference repo (read-only, never modified)**: `/home/tuancnh/code/ci_lawn/ci_lawn_web` — sibling site already redesigned for Capital Lawn Care, whose architecture this plan ports
**Complexity**: Large

## Summary

This supersedes the original in-place redesign plan. Instead of modifying `ci_mainsite` directly, the redesign is built as a **brand-new project** at `/home/tuancnh/code/ci_mainpage`, pushed to a **new GitHub repo** (`tuancat8730-sam/ci_mainpage`). `ci_mainsite` stays completely untouched — it is read from only, to port over routes, copy, and the (already-approved, do-not-change) form submission logic. The new project's architecture mirrors `ci_lawn_web`: React 19 + React Router 7, Bootstrap 5 with CSS custom-property design tokens, data/component split, `ScrollReveal` animations, and a mobile-first `responsive.css` layer.

**Why greenfield instead of in-place edit**: the original plan flagged a real conflict — `ci_mainsite`'s existing `deploy_prod.sh` deploys via SSH to `capitalirrigation.com`, which didn't match the user's "Google Cloud first" hosting request. Building fresh in a new repo removes that conflict entirely: there's no legacy deploy script to reconcile, so the new project can adopt a GCS-based deploy from day one (mirroring `ci_lawn`'s `deploy-gcs.sh`), with zero risk to the current production site until an explicit cutover decision is made.

## Decisions (confirmed by user, carried over from prior planning round)

| Question | Decision |
|---|---|
| React/Router version | **React 19 + React Router 7** (match `ci_lawn_web`) |
| Brand primary color | `#0275d8` |
| Hosting target | **Google Cloud** (GCS static hosting, mirroring `ci_lawn`'s `deploy-gcs.sh`) — now unblocked since there's no legacy SSH deploy script to conflict with |
| PR strategy | **One big PR** for the whole build, not incremental per-page PRs |
| Project location | **New project** at `/home/tuancnh/code/ci_mainpage`, new repo `git@github.com:tuancat8730-sam/ci_mainpage.git` |
| Constraint | **`ci_mainsite` must not be modified** — read-only content/logic source only |

### Resolved: hosting target conflict

Because this is a new project with no existing deploy infrastructure, "Google Cloud first" can be honored directly — no need to inherit `ci_mainsite`'s SSH-based `deploy_prod.sh` or its Node-18 pin. The new project uses `vite.config.js` with `base: './'` (relative asset paths, required for GCS bucket serving — same as `ci_lawn`) and a `deploy-gcs.sh` script modeled on `ci_lawn`'s.

**Open item to flag, not decide unilaterally**: eventually `capitalirrigation.com` DNS/hosting needs to point at the new GCS-hosted build to actually replace the current site in production. That cutover (DNS change, possibly a load balancer + Cloud CDN in front of the bucket, retiring the old SSH-deployed server) is infrastructure work with real blast radius and is **out of scope for this PR** — flagged as a follow-up decision once the new site is built and approved.

## Patterns to Mirror (from `ci_lawn_web`)

| Category | Source | Pattern |
|---|---|---|
| CSS variables | `ci_lawn_web/src/styles/variables.css` | `--color-*` custom properties for colors/shadows/transitions; `--color-primary: #0275d8` |
| CSS load order | `ci_lawn_web/src/main.jsx` | Import order: reset → variables → `bootstrap-override.scss` → animations → component styles → `responsive.css` last |
| Bootstrap override | `ci_lawn_web/src/styles/bootstrap-override.scss` | Override `$primary` before `@import bootstrap` |
| Data/component split | `ci_lawn_web/src/data/services.js` + `Services.jsx` | Extract services, pricing, testimonials, service areas, FAQs into `src/data/*.js`; components map over data |
| Scroll animation | `ci_lawn_web/src/components/ui/ScrollReveal.jsx` | Port for section entrance animations |
| Section header | `ci_lawn_web/src/components/ui/SectionHeader.jsx` | Consistent eyebrow/title/subtitle pattern |
| Mobile-first CSS | `ci_lawn_web/src/styles/responsive.css` | Mobile-default styles, `min-width` overrides for larger breakpoints, disable hover-transform on touch |
| GCS deploy | `ci_lawn/deploy-gcs.sh`, `ci_lawn_web/vite.config.js` (`base: './'`) | New project's deploy script and Vite config mirror this exactly |

## Patterns to Port (from `ci_mainsite`, read-only source)

| Category | Source | What to carry over |
|---|---|---|
| Routes | `ci_mainsite/src/App.jsx` | All 16 routes, exact paths (SEO/backlinks — do not change URLs) |
| Form logic | `ci_mainsite/src/pages/Quote.jsx`, `LawnQuote.jsx` | axios POST to `api.capitalirrigation.com`, navigate to `/thanks/` on HTTP 200, silent-fail on error — copy this logic verbatim, restyle only |
| Payment page | `ci_mainsite/src/pages/PayInvoice.jsx` | Copy integration logic verbatim — do not touch behavior |
| Page copy/content | All 16 `ci_mainsite/src/pages/*.jsx` files | Extract inline copy into `src/data/*.js` in the new project |
| Nav links | `ci_mainsite/src/layout/Nav.jsx` | Same link set: Lawn Care (external), Snow Removal (external), Testimonials, Installation, Quote, Pay Invoice, Careers, Contact |

## New Project Structure (to scaffold)

```
ci_mainpage/
├── index.html
├── package.json          # React 19, React Router 7, axios, react-icons, react-intersection-observer, sass
├── vite.config.js        # base: './' for GCS hosting
├── deploy-gcs.sh          # modeled on ci_lawn/deploy-gcs.sh
├── public/
│   └── static/img/...     # only images actually referenced, copied from ci_mainsite/public/static/img
├── src/
│   ├── main.jsx           # CSS import order: reset → variables → bootstrap-override → animations → components → responsive (last)
│   ├── App.jsx             # same 16 routes as ci_mainsite/src/App.jsx
│   ├── styles/
│   │   ├── variables.css   # --color-primary: #0275d8 + derived tokens
│   │   ├── bootstrap-override.scss
│   │   ├── animations.css
│   │   ├── navbar.css / hero.css / sections.css / services.css
│   │   └── responsive.css  # mobile-first, loaded last
│   ├── components/
│   │   ├── ui/ScrollReveal.jsx, SectionHeader.jsx
│   │   ├── layout/Navbar.jsx, Footer.jsx
│   │   └── sections/Hero.jsx, WhyChooseUs.jsx, Testimonials.jsx, ServiceArea.jsx, CTASection.jsx
│   ├── data/
│   │   ├── services.js, faqs.js, testimonials.js, team.js
│   └── pages/
│       ├── Home.jsx, Lawn.jsx, ResidentialInstall.jsx, Faqs.jsx, SuFaqs.jsx, BdFaqs.jsx
│       ├── Testimonials.jsx, TestimonialsAll.jsx, Team.jsx, Jobs.jsx
│       ├── Quote.jsx, LawnQuote.jsx, PayInvoice.jsx, PaymentSubmitted.jsx, Thanks.jsx, Contact.jsx, NotFound.jsx
```

## Tasks

### Task 0: Scaffold new project and repo
- **Action**: `npm create vite@latest ci_mainpage -- --template react` (or equivalent) at `/home/tuancnh/code/ci_mainpage`. `git init`, add remote `git@github.com:tuancat8730-sam/ci_mainpage.git`. Do **not** run this inside or copy the `.git` history of `ci_mainsite` — this is a clean new repo.
- **Mirror**: `ci_lawn_web`'s `package.json` dependency set (React 19, Router 7, axios, react-icons, react-intersection-observer, sass, Vite).
- **Validate**: `git remote -v` shows the correct new origin; `yarn dev` boots a default Vite+React page.

### Task 1: Audit content inventory from `ci_mainsite` (read-only)
- **Action**: For each of the 16 pages in `ci_mainsite/src/pages/`, read and extract copy/images/links into a content inventory (temporary, not committed) so nothing is lost when porting. No writes to `ci_mainsite` at any point.
- **Mirror**: `ci_lawn_web/src/data/*.js` shape (arrays of plain objects).
- **Validate**: Inventory covers every route in `ci_mainsite/src/App.jsx`; cross-check against `ci_mainsite/public/static/img` for images actually used.

### Task 2: Design tokens & brand direction
- **Action**: Create `src/styles/variables.css` with `--color-primary: #0275d8` plus derived tokens (`--color-primary-dark`, `--color-primary-light`, `--color-accent`, shadows, transitions, `--section-py`).
- **Mirror**: `ci_lawn_web/src/styles/variables.css`.
- **Validate**: WCAG AA contrast check for `#0275d8` against white and dark backgrounds (4.5:1 body text, 3:1 large text/UI).

### Task 3: Build foundation
- **Action**: `package.json` with React 19, React Router 7, Bootstrap 5, `sass`. Create `bootstrap-override.scss` setting `$primary: #0275d8` before `@import bootstrap`. Wire CSS import order in `main.jsx`. Configure `vite.config.js` with `base: './'` for GCS hosting.
- **Mirror**: `ci_lawn_web/package.json`, `main.jsx`, `vite.config.js`.
- **Validate**: `yarn dev` boots with no console errors; `yarn build` succeeds.

### Task 4: Shared layout (Navbar, Footer, ScrollReveal, SectionHeader)
- **Action**: Build `Navbar.jsx` and `Footer.jsx` as flex-based, mobile-first components with a working hamburger menu (no jQuery dependency). Carry over the exact nav link set from `ci_mainsite/src/layout/Nav.jsx` (read-only reference).
- **Mirror**: `ci_lawn_web/src/components/layout/Navbar.jsx`, `Footer.jsx`, `components/ui/*`.
- **Validate**: Nav collapses/expands correctly at `<768px`; all links preserved (Lawn Care, Snow Removal external links, Testimonials, Installation, Quote, Pay Invoice, Careers, Contact).

### Task 5: Build Home page (highest-traffic page first)
- **Action**: Build `Hero.jsx`, services teaser, testimonial section, residential/commercial installation sections from `src/data/*.js`, wrapped in `ScrollReveal`. Content sourced from `ci_mainsite/src/pages/Home.jsx` (read-only).
- **Mirror**: `ci_lawn_web/src/pages/Home.jsx` composition style.
- **Validate**: Visual check at 375px, 768px, 1440px; CTA buttons (`/quote/`) work; `document.title` set via `useEffect` as in the original.

### Task 6: Build remaining content pages
- **Action**: Apply the same component/data pattern to `Lawn.jsx`, `ResidentialInstall.jsx`, `Faqs.jsx`, `SuFaqs.jsx`, `BdFaqs.jsx`, `Team.jsx`, `Testimonials.jsx`, `TestimonialsAll.jsx`, `Jobs.jsx` — content sourced from the corresponding read-only `ci_mainsite` pages.
- **Mirror**: `ci_lawn_web/src/pages/ServicesPage.jsx` (alternating layout), `AboutPage.jsx`.
- **Validate**: Every route renders without console errors; FAQ sections remain keyboard/screen-reader accessible.

### Task 7: Build transactional/utility pages (Quote, LawnQuote, PayInvoice, PaymentSubmitted, Thanks, Contact, NotFound)
- **Action**: Restyle with the new visual language, but **copy the form/payment logic verbatim** from `ci_mainsite` (axios POST, endpoint URL, redirect-on-200, silent-fail-on-error) — no logic changes, since this behavior is business-critical and already approved as-is.
- **Mirror**: `ci_lawn_web/src/components/sections/ContactForm.jsx` for field styling only.
- **Validate**: Submit a test quote request against a non-prod/staging endpoint if available; confirm redirect to `/thanks/` fires on HTTP 200; confirm silent-fail is preserved on error.

### Task 8: Mobile-first responsive pass
- **Action**: Build `responsive.css` last — mobile-default component styles, `min-width` media queries for tablet/desktop, disable hover-transform via `@media (hover: none)`.
- **Mirror**: `ci_lawn_web/src/styles/responsive.css`.
- **Validate**: Test at 360px, 390px, 768px, 1024px, 1440px; Lighthouse mobile audit, target Performance/Accessibility ≥ 90.

### Task 9: GCS deploy setup
- **Action**: Write `deploy-gcs.sh` modeled on `ci_lawn/deploy-gcs.sh` (bucket name/project ID to be confirmed with user before first real deploy — do not assume `ci_lawn`'s bucket/project). Confirm `index.html` served as both main page and 404 page for client-side routing, same as `ci_lawn`'s GCS bucket config.
- **Mirror**: `ci_lawn/deploy-gcs.sh`, `ci_lawn_web/CLAUDE.md` GCS deployment notes.
- **Validate**: `yarn build` output in `dist/` loads correctly when served locally with relative paths (`base: './'`); a test deploy to a **non-production** bucket succeeds before touching anything tied to `capitalirrigation.com`.

### Task 10: Push to new repo, cross-device QA
- **Action**: Commit the full build as one PR-ready branch, push to `git@github.com:tuancat8730-sam/ci_mainpage.git`. Manually click through all 16 routes in `yarn preview`.
- **Mirror**: N/A — new repo, no existing PR conventions to mirror yet.
- **Validate**: All routes reachable, no 404s on assets, forms functional, no layout shift/broken images on mobile; `git push -u origin <branch>` succeeds against the new remote.

## Validation

```bash
cd /home/tuancnh/code/ci_mainpage
yarn install
yarn dev          # manual visual QA at http://localhost:5173
yarn build        # must succeed with no errors
yarn preview      # smoke test the production build
```

No automated test runner is planned by default (matches `ci_mainsite`'s current setup); flag to the user if they want a test suite added as a follow-up.

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Accidentally modifying `ci_mainsite` while reading it for content (e.g. running a formatter, `git add -A` from the wrong cwd) | Medium | All read operations against `ci_mainsite` are read-only (Read/Grep only, no Edit/Write); verify `pwd`/`git status` in `ci_mainsite` shows no changes before ending the task |
| Losing business copy during manual porting from `ci_mainsite`'s table-based markup | Medium | Task 1 content inventory pass before writing any new page; diff old vs. new rendered text |
| Breaking the silent-fail quote/payment form behavior while re-implementing in the new project | High impact if broken | Copy logic verbatim in Task 7, no rewrites; manual test against staging API if available |
| SEO regression from URL changes | Low (URLs kept identical) | Keep all route paths identical to `ci_mainsite/src/App.jsx`; keep per-page `<title>` logic |
| GCS bucket/project for deploy not yet defined — must not assume `ci_lawn`'s bucket | Medium | Confirm bucket name + GCP project with user before Task 9's real deploy; use a placeholder/test bucket first |
| Eventual DNS/hosting cutover from the current SSH-deployed `ci_mainsite` server to the new GCS-hosted site is a separate, high-blast-radius decision | Medium | Explicitly out of scope for this PR; flag as a follow-up once the new site is reviewed and approved |
| React 19 / Router 7 API differences from the React 18 / Router 6 patterns in `ci_mainsite` (e.g. Router 7 data APIs, React 19 ref-as-prop) | Medium | New project starts clean on React 19/Router 7 conventions from day one — no migration risk since there's nothing to migrate, only to port |
| One big PR is harder to review given 16 pages + full new project | Medium (accepted tradeoff per user's choice) | Keep commits within the PR logically separated (scaffold → design system → shared layout → per-page groups → deploy setup) so the diff is reviewable and bisectable |
| Brand color `#0275d8` contrast on various backgrounds | Low | Verify WCAG AA contrast in Task 2 |

## Acceptance

- [ ] New project scaffolded at `/home/tuancnh/code/ci_mainpage`, pushed to `git@github.com:tuancat8730-sam/ci_mainpage.git`
- [ ] `ci_mainsite` verified unmodified (`git status` clean) throughout and after the work
- [ ] All 16 routes from `ci_mainsite/src/App.jsx` re-implemented with new mobile-first design, no content lost
- [ ] React 19 + React Router 7 used throughout
- [ ] `--color-primary: #0275d8` and derived design tokens in place, Bootstrap `$primary` overridden
- [ ] Mobile (360–414px), tablet (768px), desktop (1440px) verified visually
- [ ] Quote/LawnQuote/PayInvoice form submission logic copied verbatim and verified working
- [ ] `yarn build` succeeds; GCS deploy script (`deploy-gcs.sh`) in place and tested against a non-production bucket
- [ ] Entire build shipped as a single PR with logically separated, reviewable commits
- [ ] DNS/hosting cutover to production explicitly deferred as a follow-up decision, not silently done
