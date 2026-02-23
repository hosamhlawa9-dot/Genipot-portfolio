# Geniepot Creator Portfolio

A public-facing creator portfolio page built with React, showcasing campaigns, performance stats, and top submissions for Geniepot influencer creators.

## ✅ Challenge Requirements — What I Implemented

### Required Features

| Requirement | Status | Details |
|---|---|---|
| React | ✅ | React 18, hooks, functional components |
| React Router | ✅ | Dynamic route `/creators/:creatorId` |
| Fetch API | ✅ | 3 parallel fetches via `Promise.all` |
| Loading state | ✅ | Spinner with animated lime border |
| Error state | ✅ | Error message + "Go Back" button |
| Empty state | ✅ | Handled per section |
| Clean folder structure | ✅ | hooks / components / pages / utils |
| Profile Header | ✅ | Name, username, city, platforms, bio |
| Performance Stats | ✅ | All computed from submissions — never hardcoded |
| Past Campaigns | ✅ | 5 campaigns with derived stats per campaign |
| Top Submissions | ✅ | Top 6 sorted, with status badge |

### Performance Stats (all derived from submissions array)

| Stat | How computed |
|---|---|
| Total submissions | `submissions.length` |
| Total views | `sum(s.views)` |
| Total earnings | `sum(s.earning_mad)` |
| Avg views per submission | `totalViews / totalSubmissions` |
| Best platform by views | `group by platform → sort by views` |


## 📁 Folder Structure
## Architecture

```
src/
├── hooks/
│   └── useCreatorData.js      ← All fetching + stat computation
├── utils/
│   └── formatters.js          ← formatViews, formatMAD, getPlatformColor
├── components/
│   ├── Navbar.js
│   ├── HeroSection.js
│   ├── StatsTicker.js
│   ├── PerformanceStats.js
│   ├── CampaignHistory.js     ← platform filter
│   ├── TopSubmissions.js      ← sort by views / earnings
│   ├── PortfolioModal.js      ← "Build Your Portfolio" flow (bonus)
│   ├── CTAAndFooter.js
│   └── States.js              ← Loading / Error
├── pages/
│   ├── CreatorPortfolio.js    ← /creators/:creatorId
│   └── NotFound.js
public/
└── mock/
    ├── creators.creator_001.json
    ├── campaigns.creator_001.json
    └── submissions.creator_001.json
```

### Key Architecture Decisions

**1. Custom hook pattern**
All data fetching and stat computation is isolated inside `useCreatorData.js`. Components receive clean, ready-to-display data — they are purely presentational. This makes logic independently testable without touching any UI.

**2. Stats never hardcoded**
`computeStats()` runs on every fetch and derives all 5 required metrics plus bonus metrics (validated/pending count, total engagement) from the raw submissions array. If the data changes, stats update automatically.

**3. Mock API via /public folder**
`fetch("/mock/*.json")` is served by the dev server identically to a real REST endpoint. Swapping to a real API requires changing only the 3 URLs inside `useCreatorData.js` — no component changes needed.

**4. localStorage caching**
5-minute TTL cache keyed by `creatorId`. Eliminates redundant fetches on page revisit and simulates real-world network optimization.

### Tradeoffs

| Decision | Tradeoff |
|---|---|
| Inline styles over CSS Modules | Faster to build and closer to the Figma design — would use CSS Modules or Tailwind in a team context |
| No TypeScript | Faster iteration — would add in production for prop validation and type safety |
| Top 6 submissions only | Clean UI over completeness — pagination would be added with more data |

### If I Had More Time

- React Query or SWR for smarter caching and background refetch
- Framer Motion for scroll-triggered animations
- Skeleton loading states instead of spinner
- PropTypes or TypeScript throughout
- Jest unit tests for `computeStats()`
- Responsive mobile layout

---



##  Performance Stats Computed

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

## Tradeoffs & Improvements

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


## Bonus — "Build Your Portfolio" Modal

Beyond the required challenge, I designed and implemented a **4-step portfolio creation flow** triggered by the "Log in" button in the navbar:

| Step | Content |
|---|---|
| 1 — Identity | Avatar upload, name, handle (geniepot.ma/username), location, bio |
| 2 — Niche | Content category grid (Lifestyle, Tech, Beauty...) + target audience (age, gender) |
| 3 — Platforms | TikTok / Instagram / YouTube handles + follower counts + public toggle |
| 4 — Success | Confirmation screen + shareable portfolio URL + copy button |

Design matches the Geniepot brand: dark forest green `#0D2E0D`, electric lime `#aaff00`, Inter Black font.

---

##  Design System

 --> Token & Value : 

|Forest Green    : `#0D2E0D`| 
|Electric Lime  : `#aaff00` |
|Mint           : `#E8F5C8` |
|Font           : Inter (900 for display) |


## Getting Started

```
1-bash
2-npm install
3-npm start

```

Open: `http://localhost:3000/creators/creator_001`

---


