# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

React SPA marketing website (Chinese-language) for **Theratools 空气压力波运动恢复设备** — high-pressure air compression recovery boots for athletes. Migrated from static HTML/CSS/JS to React + TypeScript + Tailwind CSS + Vite.

## Commands

```bash
npm run dev        # Vite dev server (HMR)
npm run build      # tsc + vite build → dist/
npm run preview    # Serve the production build locally
npm run lint       # oxlint
```

## Architecture

```
src/
├── main.tsx / App.tsx          # Entry point + React Router routes (/, /product, /training, /faq)
├── index.css                   # Tailwind directives + CSS reset + @keyframes faq-in
├── types/index.ts              # All TypeScript interfaces
├── data/                       # All static content as typed TS objects
│   ├── hero.ts                 # Hero title, pills, CTAs
│   ├── timeline.ts             # 5 technology timeline nodes
│   ├── features.ts             # 6 feature cards with icon keys
│   ├── comparison.ts           # 3 competitor comparison tables
│   ├── products.ts             # 2 product cards with specs
│   ├── scenes.ts               # 3 sport scene items
│   ├── trust.ts                # 4 stat items + 3 trust paragraphs
│   ├── training.ts             # 3 training cards
│   └── faq.ts                  # 12 categories × 70 Q&A items
├── hooks/
│   ├── useStickyNav.ts         # Scroll → isScrolled boolean
│   ├── useScrollSpy.ts         # IntersectionObserver → active section ID
│   └── useMobileMenu.ts        # Mobile drawer state + focus trap (UNUSED in current Nav)
├── components/
│   ├── layout/                 # Layout (skip-link + Nav + Footer + <Outlet>), Nav, Footer
│   ├── ui/                     # Button, Card, SectionHeader, SectionLabel, Reveal, Icons
│   ├── sections/               # Homepage + product/training sections (Hero, Timeline, ProductShowcase, Scenes, 产品洞察/特性/对比, Training)
│   └── faq/                    # FaqHero, FaqQuickNav, FaqCategory, FaqAccordion
└── pages/
    ├── HomePage.tsx            # Assembles 4 homepage sections (Hero/技术/产品/场景)
    ├── ProductPage.tsx         # PageHero + 产品洞察/特性/对比/产品展示
    ├── TrainingPage.tsx        # PageHero + 培训卡片
    └── FaqPage.tsx             # FaqHero + QuickNav + 12 categories
```

## Design tokens

All design tokens from the original CSS `:root` are mapped to `tailwind.config.ts` `theme.extend`:

- **Colors**: `bg-primary`, `bg-card`, `text-secondary`, `brand`, `border`, `accent`, `danger`, `success` — use like `bg-bg-primary`, `text-text-secondary`
- **Spacing**: Semantic keys `xs`–`5xl` → `p-md`, `gap-2xl`
- **Typography**: `font-sans` (Noto Sans SC + Inter), `text-display` (clamp for hero), custom letter-spacing
- **Radius**: `sm`–`full`
- **Shadows**: `shadow-sm/md/lg` (mapped in extend)
- Easing curves (`--ease-out`, `--ease-in-out`) live in `index.css` `@layer base` as CSS variables

## Key design decisions & gotchas

**FAQ accordion**: Uses React `useState` toggle — NOT native `<details>/<summary>`. Native `<details>` was unreliable across browsers for this project.

**Hash navigation**: On the homepage, `<a href="/#sectionId">` uses native browser hash scrolling (no JS). Cross-page (e.g., clicking a hash link from `/faq`/`/product`/`/training`), `handleHashClick` calls `navigate('/', { state: { scrollTo: sectionId } })` and `HomePage` reads `location.state.scrollTo` to scroll after mount. Never use React Router `<Link to="/#hash">` — this triggers a known bug that blanks the page.

**DO NOT call `close()` from `useMobileMenu` in Nav link `onClick` handlers.** The `close()` function calls `setIsOpen(false)` which triggers a React re-render during click event processing, breaking React Router's event delegation and causing unintended full-page reloads. `useMobileMenu` is currently NOT used in Nav — the mobile menu drawer was the root cause of the FAQ accordion click-bug.

**Router state for cross-page scrolling**: `HomePage` reads `useLocation().state.scrollTo` in a `useEffect`. After scrolling, `window.history.replaceState(null, '')` clears the state to prevent re-scroll on back/forward.

**Content data**: All FAQ items (70), product specs, comparison features, etc. are typed TS objects in `src/data/`. When editing content, edit the data file — components are pure renderers.

**Assets**: Images live in `public/assets/` (served at `/assets/...`). The original `assets/` directory at project root is NOT served by Vite.
