# Plan: ci_mainpage Foundation-First Build

**Source**: `/home/tuancnh/code/ci_mainpage/REDESIGN_PLAN.md` + Gemini architect session `214707a1-fb85-436a-8c84-707cff20877f`
**Approach**: Foundation-First (design system + shared components + data layer, then assemble all 16 pages)

## Build Order

1. Task 0: Scaffold Vite+React app (React 19, Router 7) in `ci_mainpage/`, keep existing git remote
2. Design tokens: `src/styles/variables.css` (`--color-primary: #0275d8` + derived tokens)
3. Build foundation: Bootstrap 5 + `bootstrap-override.scss`, `main.jsx` CSS import order, `vite.config.js` (`base: './'`)
4. Shared UI: `ScrollReveal.jsx`, `SectionHeader.jsx`
5. Shared layout: `Navbar.jsx`, `Footer.jsx` (nav links ported from `ci_mainsite/src/layout/Nav.jsx`, read-only)
6. Data extraction: `src/data/*.js` from all 16 `ci_mainsite/src/pages/*.jsx` (read-only source)
7. Section components: `Hero.jsx`, `ServicesGrid.jsx`, `WhyChooseUs.jsx`, `Testimonials.jsx`, `ServiceArea.jsx`, `CTASection.jsx`
8. Home page assembly: Navbar → Hero → SectionHeader → ServicesGrid → WhyChooseUs (ScrollReveal) → Testimonials → ServiceArea → CTASection → Footer
9. Remaining content pages (Lawn, ResidentialInstall, Faqs, SuFaqs, BdFaqs, Team, Testimonials, TestimonialsAll, Jobs)
10. Transactional pages (Quote, LawnQuote, PayInvoice, PaymentSubmitted, Thanks, Contact, NotFound) — form logic extracted into shared `useQuoteForm` hook (Gemini's suggestion, adopted) instead of duplicating axios POST logic per page
11. Mobile-first `responsive.css` pass (loaded last)
12. `deploy-gcs.sh` (bucket/project TBD with user before real deploy)
13. Commit (logically separated commits within one PR), push to `git@github.com:tuancat8730-sam/ci_mainpage.git`

## Key adoption from Gemini architect review
- `useQuoteForm` hook to centralize Quote/LawnQuote axios POST + redirect + silent-fail logic in one place, rather than copy-pasting into each form page.

Full detail (risks, acceptance criteria, file-by-file rationale) remains in `REDESIGN_PLAN.md` — this file tracks the execution order only.
