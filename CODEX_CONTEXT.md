# CODEX_CONTEXT.md - Operational Context for Codex

This file is a continuity note for Codex inside VS Code. It does not replace the project documents; it summarizes the current operating rules and project state after reading the required context files.

## Project Identity

- Project: World Cup Games Today
- Purpose: static public site for World Cup 2026 matches in the user's local time.
- Stack: Astro static site generator, TypeScript utilities, plain CSS, no Tailwind.
- Hosting target: Hostinger, uploaded from the generated `dist/` contents.
- Repository: https://github.com/estudanttedogran-svg/world-cup-games-today
- Main branch: `master`

## Required Context Files Read

Read on 2026-05-12 before Codex work:

- `CLAUDE.md`
- `CURRENT_STATUS.md`
- `PROJECT_BRIEF.md`
- `IMPLEMENTATION_PLAN.md`
- `DATA_SOURCES.md`
- `FINAL_QA_REPORT.md`
- `README.md`
- `CHECKLIST_LANCAMENTO.md`
- `src/types/index.ts`
- `src/data/teams.json`
- `src/data/groups.json`
- `src/data/matches.json`
- `public/data/live-data.json`

## Current Phase

Confirmed project phase:

- Overall: Phase 15 - Real Data and Production Preparation is in progress.
- Phase 15A: completed. Mock MVP frozen, tag `v1.0-mock` created, local backup `dist_mock_backup/` exists.
- Phase 15B: completed on 2026-05-12. `https://worldcupgamestoday.com/` is live on Hostinger with HTTPS. Routes `/`, `/pt-br/`, `/en/`, `/es/`, `/sitemap.xml`, `/robots.txt`, `/pt-br/jogos/match-001/`, `/pt-br/selecoes/northland/`, and `/pt-br/grupos/m/` returned HTTP 200. Sitemap, robots, canonical, hreflang, `og:url`, and `og:image` use `worldcupgamestoday.com`. Footer independence notice and MOCK notices remain visible. No real Analytics or AdSense was added.
- Phase 15C: completed. `DATA_SOURCES.md` defines the official data collection and validation process.
- Phase 15D-0: created. `REAL_DATA_MIGRATION_PLAN.md` defines safe draft-based migration and explicitly blocks replacing `teams.json` in isolation.
- Phase 15D-1: initiated. `src/data/real/teams.real.draft.json` and `src/data/real/sources.json` exist outside the public build. The draft currently contains 48 FIFA-listed teams with source metadata. No public data JSON has been changed.
- Phase 15D-2: completed in draft. `src/data/real/teams.real.draft.json` was validated, flags were normalized from nonexistent SVG paths to emoji strings, and `name.pt-br`/`name.es` were localized in draft. `src/data/real/sources.json` records these manual draft normalizations. No public data JSON has been changed or promoted.

Next allowed action depends on user authorization:

- The next recommended action is a read-only audit of 15D-2, followed by an explicit commit authorization if the audit passes.
- Do not edit real data, remove MOCK notices, or add Analytics/AdSense before the authorized phase requires it.

## Non-Negotiable Continuity Rules

- Do not restart the project from scratch.
- Do not recreate architecture.
- Do not replace the stack.
- Do not refactor without a direct need.
- Do not alter data, pages, or components without explicit authorization.
- Before any future task, confirm the current project phase from `CURRENT_STATUS.md` and `IMPLEMENTATION_PLAN.md`.
- Continue only the next authorized phase.
- At the end of any phase or subphase:
  - run `npm run build` when it makes sense;
  - update `CURRENT_STATUS.md`;
  - report changed files;
  - stop and wait for authorization.

## Data Rules

- Current data is mock only.
- `src/data/teams.json`: 8 fictional teams, `_mock: true`.
- `src/data/groups.json`: 2 fictional groups, `_mock: true`.
- `src/data/matches.json`: 11 mock matches, 8 confirmed and 3 partial, `_mock: true`.
- `public/data/live-data.json`: mock live scores/status/standings, `_mock: true`.
- `src/data/real/teams.real.draft.json`: real teams draft only, not imported by the app. After 15D-2 it contains 48 teams, emoji string flags, and localized draft labels for `pt-br` and `es`.
- `src/data/real/sources.json`: source registry for drafts only, not imported by the app. After 15D-2 it records FIFA source entries plus manual draft normalization entries for flags and localized names.
- Do not replace `teams.json` in isolation. Real teams, groups, matches, and live-data references must be migrated as a coordinated set after draft validation and QA, because the current mock JSONs cross-reference ids such as `northland` and `eastoria`.
- Real data drafts must stay outside the public build until QA approves coordinated promotion.
- `Team.flag` remains a string in this phase; after 15D-2 the draft uses emoji strings, never `null` and never missing SVG paths.
- Never insert real data from model memory.
- Real data requires primary source verification, preferably FIFA official pages or FIFA media releases.
- Secondary sources are only for cross-checking.
- No inferred or invented matches, teams, groups, times, venues, or scores.
- `matches.json` must never contain scores; scores/status live only in `public/data/live-data.json`.
- `SportsEvent` JSON-LD only for confirmed matches with both teams defined.
- MOCK warnings can only be removed in Phase 15I after Phase 15H QA is approved.

## Important Types

- Locale: `'pt-br' | 'en' | 'es'`
- `LocalizedString` requires all three keys: `'pt-br'`, `en`, `es`.
- Match types: `confirmed`, `partial`, `simulation`.
- Real `matches.json` should use `confirmed` or `partial`; `simulation` is not for real imported match data.
- Live match statuses: `scheduled`, `live`, `finished`, `postponed`, `cancelled`.

## Build and Deployment Notes

- Main commands:
  - `npm run dev`
  - `npm run build`
  - `npm run preview`
- `PUBLIC_SITE_URL` in `.env` is already set to `https://worldcupgamestoday.com`; do not change unless explicitly requested.
- `PUBLIC_GA_MEASUREMENT_ID` is empty; GA script is conditional and should stay inactive until Phase 15K.
- Deploy by uploading the contents of `dist/`, not the `dist/` folder itself.
- Never upload `.env`, `node_modules/`, `src/`, or `dist_mock_backup/`.

## Current Caution

Some terminal output in PowerShell may show mojibake for accented Portuguese text. Treat this as console encoding display, not necessarily file corruption. Avoid broad formatting or encoding rewrites.

## Current Onboarding Change

Created this file as the Codex continuity context. No source code, data JSON, page, component, or build output was intentionally changed.
