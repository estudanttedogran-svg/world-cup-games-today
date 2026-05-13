# MATCH_SCHEDULE_SOURCE_REVIEW.md - Phase 15F-1

**Date:** 2026-05-12  
**Status:** blocked - official article content is not sufficient for a reliable `matches.real.draft.json`  
**Scope:** source review only. No public JSON was changed, no real match data was promoted, and no build was run.

---

## Official Source Reviewed

Primary public article:

```text
https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/match-schedule-fixtures-results-teams-stadiums
```

Official FIFA content API response identified from that article:

```text
https://cxm-api.fifa.com/fifaplusweb/api/sections/article/S9YG2JmeGYaMUCBbm0CcD?locale=en
```

Article title found in the response:

```text
View the FIFA World Cup 2026 match schedule
```

Published date found in the response:

```text
2026-03-31T00:01:00+00:00
```

The response also links to an official PDF:

```text
https://digitalhub.fifa.com/asset/4b5d4417-3343-4732-9cdf-14b6662af407/FWC26-Match-Schedule_English.pdf
```

This PDF is the next priority source for Phase 15F-1. It appears to declare that all times are Eastern Time (ET), but that observation still requires a dedicated PDF audit before any draft extraction or UTC conversion.

---

## What Was Found

The official article response contains:

- 104 unique FIFA match-centre links.
- Group-stage fixture text with dates, teams, group labels, and stadium names.
- Knockout fixture text with dates, official labels such as `Winner match 74 v Winner match 77`, and stadium names.
- A downloadable official PDF link for the full match schedule.

Local review of the article response found:

```text
match-centre links: 104
unique match-centre links: 104
time pattern matches in article text: 0
stadium pattern matches in article text: 105
official PDF link present: yes
```

---

## Fields Available With Reasonable Confidence

From the article response itself:

- fixture date;
- fixture pairing for group-stage matches;
- group label for group-stage matches;
- official knockout labels for knockout matches;
- stadium name;
- FIFA match-centre URL for each fixture.

---

## Fields Missing Or Not Extractable With Confidence

The article response does not provide enough structured data for the current `Match` model because these fields are missing or not reliably extractable:

- kickoff time;
- source timezone or local-time basis;
- `datetime_utc`;
- city per match;
- country per match;
- explicit `match_number` for all 104 matches in the article text;
- a structured table separating every field required by `src/types/index.ts`.

The current `Match` interface requires `datetime_utc`, `stadium`, `city`, `country`, `match_number`, `phase`, and team IDs or labels. Since the article does not expose kickoff times or timezone information, creating `matches.real.draft.json` would require inference or a second source.

---

## Decision

`src/data/real/matches.real.draft.json` was **not created**.

Reason:

- The identified official article is useful but incomplete for a safe project draft.
- Without kickoff time and timezone, `datetime_utc` cannot be produced without guessing.
- City and country should not be inferred from stadium names under the real-data rules.
- The phase and match-number mapping for all 104 matches should be extracted from a more structured official source, not reconstructed manually from incomplete article prose.

---

## Required Next Source

Continue Phase 15F-1 only after one of these is available and reviewed:

- the official FIFA PDF linked from the article, if it contains kickoff times and locations;
- an official FIFA scores/fixtures endpoint/page that exposes structured match data;
- an official CSV or downloadable schedule file;
- manual assisted collection from the official PDF/page, with every row reviewed and no inferred fields.

The PDF extraction, if authorized, must be validated line by line. Do not infer city, country, kickoff time, timezone, or `datetime_utc`; each value must be directly present in the official source or derived only from an explicitly audited source timezone.

Any next attempt must still keep data in `src/data/real/`, outside the public build, and must not alter:

- `src/data/matches.json`;
- `src/data/teams.json`;
- `src/data/groups.json`;
- `public/data/live-data.json`.

---

## Current 15F-1 Result

Phase 15F-1 is blocked pending a complete official source or a manual official-PDF extraction workflow.

No public data was changed. MOCK remains preserved.
