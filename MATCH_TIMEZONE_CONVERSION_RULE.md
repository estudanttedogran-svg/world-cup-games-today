# MATCH_TIMEZONE_CONVERSION_RULE.md - Phase 15F-3

**Date:** 2026-05-12  
**Status:** conversion rule documented; no match draft created  
**Scope:** timezone rule only. This document does not extract the 104 matches, does not create `src/data/real/matches.real.draft.json`, and does not convert the full FIFA schedule.

---

## Source Time Basis

The official FIFA match schedule PDF audited in Phase 15F-2 declares:

```text
All times are Eastern Time (ET).
```

Therefore, kickoff times extracted from that PDF must be interpreted as Eastern Time, not as the local time of the stadium or host city.

Primary schedule source:

```text
https://digitalhub.fifa.com/asset/4b5d4417-3343-4732-9cdf-14b6662af407/FWC26-Match-Schedule_English.pdf
```

---

## Technical Timezone

Use this IANA timezone identifier for the PDF's ET times:

```text
America/New_York
```

Do not use a fixed manual offset such as `UTC-04:00` for all rows unless the offset is produced by a timezone-aware conversion for the specific match date.

Reason:

- `ET` is a civil-time label, not a machine-safe timezone identifier.
- `America/New_York` is the IANA identifier that represents Eastern Time rules for New York/Eastern US timekeeping.
- IANA tzdb records offsets and daylight-saving transitions; runtime/library conversions should rely on that data.

Timezone reference:

```text
https://data.iana.org/time-zones/tzdb/tz-link.html
```

DST rule reference:

```text
https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst
```

NIST states that in 2026 daylight saving time is in effect from 2026-03-08 at 02:00 local time to 2026-11-01 at 02:00 local time. The FIFA World Cup 2026 match window in June and July falls inside that DST interval, but each conversion must still use `America/New_York` rather than a hand-written global offset.

---

## Conversion Rule

For each future match row extracted from the official PDF:

1. Read `original_date` exactly from the FIFA PDF.
2. Read `original_time_et` exactly from the FIFA PDF.
3. Interpret `original_date + original_time_et` in `America/New_York`.
4. Convert that zoned datetime to UTC.
5. Store only the UTC ISO value in the future `Match.datetime_utc` field.
6. Keep audit metadata in the extraction worksheet or draft notes:
   - `original_date`;
   - `original_time_et`;
   - `conversion_timezone: "America/New_York"`;
   - `conversion_offset`, as returned for that date/time;
   - final `datetime_utc`.

Future `matches.real.draft.json` must keep the project-facing field as:

```json
"datetime_utc": "YYYY-MM-DDTHH:mm:ssZ"
```

No production/public JSON should store the original ET time unless a later schema change explicitly adds audit-only fields outside the current `Match` interface.

---

## DST Requirements

The extraction process must not assume a fixed offset without validation.

Required behavior:

- Use `America/New_York` through a reliable timezone-aware runtime or library.
- Acceptable approaches include `Intl`/Temporal where available, `date-fns-tz`, Luxon, or an equivalent audited conversion method backed by IANA timezone data.
- Do not convert by string concatenation or manual arithmetic unless the result is independently checked by a timezone-aware tool.
- Validate that the tournament dates being converted fall within the 2026 DST interval documented by NIST.
- Record the offset actually used for each converted row.
- Pay special attention to `00:00` and late-evening ET kickoffs because the UTC date may differ from the PDF date.

Expected 2026 tournament-period offset:

```text
America/New_York during June/July 2026 should resolve to EDT, UTC-04:00.
```

This is an expectation for audit, not a replacement for timezone-aware conversion.

---

## Generic Example

This is a rule example only. It is not a real match row and must not be added to any match draft.

Input:

```text
original_date: 2026-06-15
original_time_et: 12:00
conversion_timezone: America/New_York
```

Interpretation:

```text
2026-06-15 12:00 in America/New_York
```

Because this date falls during the 2026 DST period, the expected offset is `UTC-04:00`.

Output:

```text
datetime_utc: 2026-06-15T16:00:00Z
conversion_offset: -04:00
```

---

## Required Validations For Phase 15F-4

Before any future `matches.real.draft.json` is accepted:

- No `datetime_utc` is empty.
- Every `datetime_utc` is ISO-8601 with `Z`.
- No time is converted manually without `America/New_York`.
- Every source row records `original_date`.
- Every source row records `original_time_et`.
- Every source row records `conversion_timezone: "America/New_York"`.
- Every source row records the `conversion_offset` used.
- A manual sample is checked against a second timezone-aware tool.
- UTC date changes are explicitly reviewed where applicable.
- `datetime_utc` is not derived from stadium-local time when the source is the FIFA PDF declaring ET.
- `src/data/real/matches.real.draft.json` remains outside the public build until a later authorized phase.

---

## Current Decision

Phase 15F-3 defines the conversion rule only.

No match rows were extracted. No complete schedule conversion was performed. No public JSON was changed.
