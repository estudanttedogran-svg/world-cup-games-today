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
- Phase 15E-1: completed in draft on 2026-05-12. `src/data/real/groups.real.draft.json` was created from the existing `group` fields in `teams.real.draft.json`, producing 12 groups A-L with 4 teams each. The draft remains outside the public build and has not been promoted to `src/data/groups.json`.
- Phase 15F-1: blocked on 2026-05-12 after reviewing the official FIFA match-schedule article and its public content response. The article contains 104 unique match-centre links and fixture prose, but it does not expose kickoff times, source timezone/local time, `datetime_utc`, or city/country per match in a form sufficient for the current `Match` type. `MATCH_SCHEDULE_SOURCE_REVIEW.md` records the review. `src/data/real/matches.real.draft.json` was not created.
- Phase 15F-2: completed as a PDF source audit on 2026-05-12. `MATCH_SCHEDULE_PDF_REVIEW.md` records that the official FIFA PDF visually contains the full 104-match schedule, dates, kickoff times, an `All times are Eastern Time (ET)` note, host-city rows, phase bands, group/team cells, and knockout labels. The PDF text layer is not table-safe, stadium/country per match still need separate validation, and no `matches.real.draft.json` was created.
- Phase 15F-3: completed as a timezone conversion rule on 2026-05-12 and corrected after audit on 2026-05-13. `MATCH_TIMEZONE_CONVERSION_RULE.md` defines that FIFA PDF times declared as Eastern Time (ET) must be interpreted as `America/New_York`, converted with a timezone-aware runtime/library, audited against NIST 2026 DST rules and IANA/tzdb behavior, and stored only as future `datetime_utc`. `REAL_DATA_MIGRATION_PLAN.md` is synchronized: when an official source declares a common timezone base, conversion uses that declared timezone, not stadium-local time. No match rows were extracted and no `matches.real.draft.json` was created.
- Phase 15F-4: created a small UTC conversion sample on 2026-05-13. `src/data/real/matches.sample.draft.json` contains 5 sample matches only: 3 confirmed group-stage fixtures and 2 partial knockout fixtures. Each row stores project-facing `datetime_utc` plus `conversion_audit` metadata with original ET date/time, `America/New_York`, offset, and notes. No complete `matches.real.draft.json` was created and no public JSON was promoted.

Next allowed action depends on user authorization:

- The next recommended action is a read-only audit of the 15F-4 sample before extracting all 104 matches or creating `matches.real.draft.json`.
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
- `src/data/real/groups.real.draft.json`: real groups draft only, not imported by the app. After 15E-1 it contains 12 groups A-L derived from `teams.real.draft.json`; it has not been promoted to `src/data/groups.json`.
- `src/data/real/matches.sample.draft.json`: small 15F-4 sample only, not imported by the app. It contains 5 sample matches with ET-to-UTC audit metadata and must be audited before any full draft.
- `src/data/real/matches.real.draft.json`: does not exist yet. Future PDF times must be interpreted as `America/New_York`, not stadium-local time, because the FIFA PDF declares all times as ET. Do not create the full 104-match draft until the 15F-4 sample is audited and explicitly approved.
- `src/data/real/sources.json`: source registry for drafts only, not imported by the app. It records FIFA source entries, manual draft normalization entries for teams, the derived groups draft entry, the blocked article source, the reviewed official PDF source, and reviewed NIST/IANA timezone references.
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
