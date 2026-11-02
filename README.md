# VELOOP Rewards — Level Journey

A responsive React dashboard prototype for VELOOP Rewards. The page brings current level progress, the next locked reward, a level roadmap, XP activity, earning opportunities, and a playable mini-game into one progression hub.

The app opens with a responsive sign-in screen with a create-account option. Demo sign-in accepts any valid email and a password of at least six characters; demo registration asks for a name, valid email, matching passwords of at least eight characters, and terms acceptance. Both actions are frontend-only, do not create or verify real accounts, and reset when the page is refreshed.

## Project overview

- Current Level 04, 6,420 XP, and the XP remaining to the next milestone are shown together.
- The Level 05 badge and 500 VEs reward are demo previews, not a promise of a live reward.
- Level badge artwork is bundled locally from the supplied VELOOP reference page.
- XP, levels, account details, activities, wallet balances, and all reward values are development-only data. There is no backend integration.

## Level and XP system

The prototype starts with 6,420 XP at Level 04. Level 05 begins at 8,000 XP; each later level uses a 2,000 XP milestone interval. The current level, progress bar, remaining XP, next badge, and roadmap respond to XP earned during the session.

The displayed thresholds are sample frontend configuration. Replace them with the approved level configuration when the backend is connected.

## Next-level rewards

The next-level card previews 500 VEs and the Level 05 badge with a locked state. This is dummy presentation data only. It does not award VEs or represent approved reward rules.

## Game concept and rules

**VE Coin Catch** is a short, skill-based tap challenge:

- Tap the moving coin as many times as possible in 20 seconds.
- Catch 8 coins in a round to qualify for +20 demo XP.
- A player can start at most 3 rounds in the current page session.
- The result screen reports the score and whether the demo XP qualification was met.
- Closing a round while playing ends it and uses one attempt.

The game changes XP only in the browser session. It does not issue VEs, persist results, or call a reward API. Daily attempt limits and XP amounts must be replaced with backend-approved rules before production.

## Earning features

- **Daily check-in:** one interactive +10 demo XP action per page session.
- **VE Coin Catch:** the playable mini-game above.
- **Watch & earn** and **Refer a friend:** clearly marked Coming Soon; no unsupported earning mechanism is implemented.

All demo amounts are explicitly labelled in the UI.

## Wallet and payout prototype

The **Wallet & payouts** navigation item opens a responsive wallet overview and payout request flow:

- The sample wallet starts with ₹1,250 available, ₹0 reserved, and a ₹100 minimum payout. These are illustrative values for demonstrating the workflow.
- Users can submit a demo UPI or bank-transfer request. The form validates the amount, fictional UPI ID, account holder, account number, and IFSC format.
- Submitting a valid request reserves the sample amount and shows a pending request, confirmation, and transaction row.
- Payout balances and requests are held only in React state for the current page session. No payment information is transmitted or stored by the app.

**Use fictional payment details only.** This frontend prototype does not initiate transfers, verify identities, connect to a payment provider, or represent a real payout. Live payouts require an approved provider, secure server-side validation, authorization, privacy/security review, and reliable request/status handling.

## Technology stack

- React 18 and Vite
- Bootstrap 5
- CSS Modules
- Lucide React icons
- React Hooks

## Installation and development

Requires Node.js LTS.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. Production commands:

```bash
npm run build
npm run preview
```

## Folder structure

```text
src/
  assets/                 VELOOP level badges, lock mark, and brand mark
  Dashboard.jsx           Sign-in-gated dashboard, progression state, and game
  Dashboard.module.css    Responsive dashboard, navigation, and game styles
  Login.jsx               Responsive demo sign-in/create-account screens and validation
  Login.module.css        Authentication screen design, states, and mobile layouts
  Wallet.jsx              Demo wallet overview and payout-request flow
  Wallet.module.css       Wallet, validation, and transaction-history styles
  global.css              Global typography and page background
  main.jsx                React entry point
index.html                Vite HTML entry point
```

## Component architecture

`Dashboard.jsx` owns the dashboard's demo XP, check-in, game round, activity list, level-up state, and page navigation. `Wallet.jsx` owns the sample wallet balance, payout validation, requests, and session transaction list. The level roadmap and reward presentation use the locally bundled VELOOP badge assets. The two CSS Modules contain their respective layouts and responsive states.

## Responsive behavior

The desktop layout uses a left navigation rail and paired content panels. At tablet widths the navigation becomes a horizontal bar and action panels stack. On small screens the earning/game details and payout form reflow, wallet summary cards use a two-column grid, and the level roadmap scrolls horizontally to preserve badge labels and spacing.

## Animation and accessibility

The XP bar animates on page load; challenge and level-up results use restrained reveal transitions. Reduced-motion preferences disable animations. Navigation uses in-page links, progress is exposed with `role="progressbar"`, game actions are keyboard-operable buttons, and the modal states announce their purpose.

## Screenshots

No screenshots are included in this source-only workspace yet. Capture desktop, tablet, and mobile views plus game start/play/result states after running the local development server.

## Live demo and repository

- **Live demo:** [VELOOP Rewards Experience Platform](https://veloop-rewards-experience-platform.vercel.app)
- **GitHub repository:** [Sravanthi-295/VELOOP-Rewards-Experience-Platform](https://github.com/Sravanthi-295/VELOOP-Rewards-Experience-Platform)
- **Author:** VELOOP Rewards frontend development task.
