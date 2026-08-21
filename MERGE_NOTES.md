# StepUp for SDG — Final Merge

## Source of truth
- Home page: Rahini branch (`src/site-pages/Home.jsx` and its supporting components/assets/data).
- Work With Us and partnership forms: Rahini branch (`src/site-pages/WorkWithUsPage.jsx`, `src/site-pages/partner/*`, `src/components/contact/*`).
- Other application pages: main/master project, including About, Impact, Projects, SDG, Partners, Contact, dashboard/admin and project routes.

## Removed from the main project
- Old main `app/page.tsx` Home route.
- Old `app/work-with-us` implementation.
- Old `app/get-involved/*` form routes so they cannot compete with the Rahini forms.
- Generated `.next`, temporary `_tmp*` files and the unused Rahini reference/public build folders.

## Routing
Rahini's public navigation now uses real Next.js routes instead of hash scrolling:
- `/`
- `/about`
- `/projects`
- `/impact`
- `/sdg`
- `/partners`
- `/contact`
- `/work-with-us`
- `/work-with-us/corporate`
- `/work-with-us/schools`
- `/work-with-us/ngos`
- `/work-with-us/volunteers`

The legacy `/partner/*` aliases are retained and point to the same Rahini forms.
