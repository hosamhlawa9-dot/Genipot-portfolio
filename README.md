# Geniepot Creator Portfolio

A public-facing creator portfolio page built with React, showcasing campaigns, performance stats, and top submissions for Geniepot influencer creators.

## 🚀 Quick Start

```bash
npm install
npm start
```

Then visit: `http://localhost:3000/creators/creator_001`

## 📁 Folder Structure

```
src/
├── components/
│   ├── Navbar.js           # Sticky top nav
│   ├── HeroSection.js      # Creator profile header with photo
│   ├── StatsTicker.js      # Animated scrolling stats banner
│   ├── PerformanceStats.js # Dashboard with derived metrics
│   ├── CampaignHistory.js  # Past campaigns with platform filtering
│   ├── TopSubmissions.js   # Top content with view/earnings sorting
│   ├── PortfolioModal.js   # 4-step "Create Your Portfolio" modal
│   ├── CTAAndFooter.js     # CTA section + footer
│   └── States.js           # Loading, Error, Empty state components
├── hooks/
│   └── useCreatorData.js   # All data fetching + stat computation
├── pages/
│   ├── CreatorPortfolio.js # Main page, route: /creators/:creatorId
│   └── NotFound.js         # 404 page
├── utils/
│   └── formatters.js       # Number formatting helpers
public/
└── mock/
    ├── creators.creator_001.json
    ├── campaigns.creator_001.json
    └── submissions.creator_001.json
```

## 🏗️ Architecture Decisions

### 1. Custom Hook for Data Layer (`useCreatorData`)
All fetching, caching, and stat computation is isolated in a single custom hook. Components receive clean, ready-to-use data — they never fetch or compute directly. This makes the logic testable and components purely presentational.

### 2. Derived Stats — Never Hardcoded
All 5 required metrics (total submissions, total views, total earnings, avg views/submission, best platform) are computed inside `computeStats()` in the hook. Change the JSON data → stats update automatically.

### 3. Mock API via `fetch("/mock/*.json")`
Files in `/public/mock/` are served statically by CRA's dev server, simulating real API endpoints cleanly. Switching to a real API requires only changing the URL in `useCreatorData.js`.

### 4. localStorage Caching (Bonus)
First load fetches from mock files. Subsequent loads within 5 minutes serve from localStorage, simulating network optimization. Cache is keyed by `creatorId`, so multiple creators work independently.

### 5. React Router Dynamic Routes
Route `/creators/:creatorId` supports any creator ID. Adding `creator_002` only requires adding their JSON files to `/public/mock/`.

## ⚡ Performance Stats Computed

From `submissions.creator_001.json`:
- **Total submissions** — `submissions.length`
- **Total views** — `sum(s.views)`
- **Total earnings** — `sum(s.earnings)`  
- **Avg views/submission** — `totalViews / totalSubmissions`
- **Best platform** — `platform with highest total views`

## ✅ Bonus Features Implemented

- [x] **Platform filtering** — Campaign History section (All / TikTok / Instagram)
- [x] **Sorting by views/earnings** — Top Submissions section
- [x] **localStorage caching** — 5-minute TTL per creator
- [x] **Loading, error, empty states** — All handled properly

## 🔄 Tradeoffs & Improvements

**Tradeoffs made:**
- Used inline styles instead of CSS Modules to keep Stitch-to-React conversion fast and faithful to the design tokens
- No pagination implemented (only 7 submissions in mock data; would add for 20+)
- No TypeScript (would add for production to type-check API responses)

**Future improvements:**
- Add React Query / SWR for smarter caching and background refetch
- Add Framer Motion for scroll animations (ticker, stat counters)
- Skeleton loading states instead of spinner
- PropTypes or TypeScript interfaces for all components
- Unit tests for `computeStats()` utility

## 🎨 Design System

| Token | Value |
|-------|-------|
| Forest Green | `#0D2E0D` |
| Electric Lime | `#aaff00` |
| Mint | `#E8F5C8` |
| Font | Inter (900 for display) |
