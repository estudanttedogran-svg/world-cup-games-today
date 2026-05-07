export type Locale = 'pt-br' | 'en' | 'es';

export interface LocalizedString {
  'pt-br': string;
  en: string;
  es: string;
}

export type MatchType = 'confirmed' | 'partial' | 'simulation';

export type MatchPhase =
  | 'group_stage'
  | 'round_of_32'
  | 'round_of_16'
  | 'quarterfinal'
  | 'semifinal'
  | 'third_place'
  | 'final';

export type MatchStatus =
  | 'scheduled'
  | 'live'
  | 'finished'
  | 'postponed'
  | 'cancelled';

export interface Team {
  id: string;
  name: LocalizedString;
  slug: string;
  group: string | null;
  flag: string;
  confederation: string;
}

export interface Match {
  id: string;
  type: MatchType;
  phase: MatchPhase;
  group: string | null;
  match_number: number;
  datetime_utc: string;
  stadium: LocalizedString;
  city: LocalizedString;
  country: LocalizedString;
  home_team_id: string | null;
  away_team_id: string | null;
  home_label: LocalizedString | null;
  away_label: LocalizedString | null;
}

export interface StandingEntry {
  team_id: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  points: number;
}

export interface Group {
  id: string;
  name: LocalizedString;
  slug: string;
  team_ids: string[];
}

export interface OverrideMatchEntry {
  match_id: string;
  field: string;
  value: string;
  reason: string;
  applied_at: string;
}

export interface Overrides {
  matches: OverrideMatchEntry[];
}

export interface LiveMatchData {
  status: MatchStatus;
  score_home: number | null;
  score_away: number | null;
  minute: number | null;
}

export interface LiveData {
  last_updated: string;
  matches: Record<string, LiveMatchData>;
  standings: Record<string, StandingEntry[]>;
}
