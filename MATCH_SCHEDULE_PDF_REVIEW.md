# MATCH_SCHEDULE_PDF_REVIEW.md - Phase 15F-2

**Date:** 2026-05-12  
**Status:** reviewed - official PDF is useful and promising, but not yet a safe automatic extraction source  
**Scope:** source audit only. `src/data/real/matches.real.draft.json` was not created. No public JSON was changed, no real match data was promoted, and no build was run.

---

## Official Source Reviewed

Primary FIFA PDF:

```text
https://digitalhub.fifa.com/asset/4b5d4417-3343-4732-9cdf-14b6662af407/FWC26-Match-Schedule_English.pdf
```

Observed PDF details:

- Title/visual header: `FIFA WORLD CUP 2026` and `MATCH SCHEDULE`.
- File name exposed by the PDF viewer: `FWC26 Match Schedule_v17_10042026.ai`.
- Footer date: `10 April 2026`.
- Source host: `digitalhub.fifa.com`, linked from the official FIFA match schedule article reviewed in Phase 15F-1.

Conclusion: the file is an official FIFA schedule document for the FIFA World Cup 2026.

---

## Fields Observed In The PDF

The visual PDF provides enough schedule information to justify a future assisted extraction pass:

- match numbers, visible from match 1 through match 104;
- fixture dates across the tournament calendar;
- kickoff times per fixture;
- a timezone/base note: `All times are Eastern Time (ET).`;
- host city rows, including Vancouver, Seattle, San Francisco Bay Area, Los Angeles, Guadalajara, Mexico City, Monterrey, Houston, Dallas, Kansas City, Atlanta, Miami, Toronto, Boston, Philadelphia, and New York New Jersey;
- regional bands for Western, Central, and Eastern regions;
- group-stage pairings using team abbreviations and group letters;
- knockout labels such as `1A`, `2B`, `W74`, and `W77`;
- phase bands: group stage, round of 32, round of 16, quarter-finals, semi-finals, bronze final, and final;
- rest-day markers and the FIFA `Subject to change` note.

For the current `Match` interface, the PDF appears to cover:

| Match field need | PDF audit result |
|------------------|------------------|
| `match_number` | Present visually |
| date | Present visually in the calendar columns |
| kickoff time | Present visually in each match cell |
| timezone/base | Present: all times are Eastern Time (ET) |
| stadium | Not clearly present in the visual schedule cells; host city is present |
| city | Present as row labels |
| country | Not explicitly listed per row; would require an audited host-city-to-country source or explicit PDF evidence |
| teams/labels | Present visually as team abbreviations or knockout labels |
| phase/group | Present visually via phase bands and group letters |
| `datetime_utc` | Derivable only after a separate ET/DST conversion audit |

---

## Text Extraction Quality

The PDF has a single page and the extracted text is not table-safe. The text layer interleaves match cells, team abbreviations, group letters, times, dates, labels, and host-city rows out of visual order.

Examples observed during audit:

- match entries appear as fragments such as team abbreviation lines followed by group letters and time fragments;
- knockout labels are split across separate lines, for example `1K`, `3`, and `DEIJL`;
- host cities are listed together after many match fragments rather than remaining attached to each row/cell;
- the source timezone note is extractable, but not attached structurally to each match row.

Conclusion: this PDF should not be parsed into `matches.real.draft.json` by naive text extraction. A future extraction must be visual/table assisted and validated line by line. It must not be used automatically for `stadium`, `city`, or `country` without a separate validation pass.

---

## Schedule Coverage

The PDF visually covers the full tournament schedule:

- 104 matches appear to be present, from match 1 through match 104;
- group stage is present;
- round of 32 is present;
- round of 16 is present;
- quarter-finals are present;
- semi-finals are present;
- bronze final is present;
- final is present;
- host city rows are present.

This audit did not extract all 104 rows into structured data, by design.

---

## Timezone And UTC Risks

The PDF declares that all times are Eastern Time (ET). A future UTC conversion pass must still be audited carefully because:

- the tournament spans June and July 2026, when Eastern Time is expected to be daylight time (`America/New_York`, UTC-04), but this must be handled by timezone rules, not a hard-coded offset;
- `ET` is a label, not an ISO timezone identifier;
- conversion must produce `datetime_utc` only after date and kickoff time are extracted for each specific match;
- midnight-adjacent fixtures such as `00:00` require date-boundary checks before conversion.

No UTC conversion was performed in Phase 15F-2.

---

## Risks Registered

- The PDF text layer is desynchronized from the visual table.
- Automated extraction could map a kickoff time to the wrong match.
- Automated extraction could map a host city to the wrong match.
- Stadium is not clearly present per match in the audited visual schedule; a separate official source may be needed for stadium names.
- Country is not explicitly present per match in the audited visual schedule; do not infer it from city without an audited source.
- ET-to-UTC conversion requires DST-aware timezone handling.
- Knockout labels are compact and must be normalized carefully into `home_label` and `away_label`.

---

## Decision

The PDF is an official and useful source, but it is not enough for safe automated extraction into the current `Match` model without a dedicated line-by-line workflow.

Recommended next step:

1. Run Phase 15F-3 - define the official ET-to-UTC conversion rule using a real timezone identifier before any match draft.
2. Prefer an official structured FIFA endpoint, CSV, or accessible table if one is available through normal public channels.
3. If no structured source is available, perform assisted PDF extraction from the visual schedule with row-by-row validation.
4. Before creating `matches.real.draft.json`, define an audited host-city/stadium/country mapping and keep stadium/country out of trusted extraction scope until validated.

`src/data/real/matches.real.draft.json` remains nonexistent after Phase 15F-2.
